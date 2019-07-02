import React, { useState, useRef } from 'react';
import { isEmpty, isEqual, forEach } from 'lodash';
import { connect } from 'react-redux';
import { RouteComponentProps, Prompt } from 'react-router-dom';

// types
import { Dispatch, AnyAction } from 'redux';
import { ReduxState, ITheme, ISkillPopulated } from 'reducers';

// components
import LazyLoader from '../../components/ui/LazyLoader/LazyLoader';
import withApis, { ApiComponentProps } from '../../hoc/withApi';
import Stars from '../../components/stars/stars';
import ContinueButton from '../../components/buttons/ContinueButtom/ContinueButton';
import Info from '../../components/ui/Info/Info';
import ConfirmModal from '../../components/modals/ConfirmStar/ComfirmModal';

// hooks
import { useDidMount, useDidUpdate } from '../../hooks';

// requests
import { listCompetences, IUpdateParcoursParams, ISkill } from '../../requests';

// redux
import parcoursActions from '../../reducers/parcours';
import { currentThemeSelector } from '../../selectors/parcours';
import classes from './comptences.module.scss';
import Experiences from '../../components/experiences/expreriences';
import classNames from '../../utils/classNames';
import Grid from '../../components/ui/Grid/Grid';
import modalAction from '../../reducers/modal';

interface IMapToProps {
  currentThemeSkill: ISkillPopulated;
  skills: ISkillPopulated[];
  parcoursFetching: boolean;
  error: string;
}

interface IDispatchToProps {
  parcoursRequest: (args: IUpdateParcoursParams) => void;
  openModal: (children: any) => void;
  closeModal: () => void;
}

type Props = RouteComponentProps<{ id: string }> &
  ApiComponentProps<{ list: typeof listCompetences }> & {
    theme: ITheme;
    goNext: () => void;
    nextUrl: string | null;
  } & IMapToProps &
  IDispatchToProps;

const CompetenceContainer = ({
  list,
  currentThemeSkill,
  parcoursRequest,
  goNext,
  history,
  nextUrl,
  match,
  skills,
  parcoursFetching,
  error,
  openModal,
  closeModal,
  theme, /// check theme.type and change style if it's professional
}: Props) => {
  const [competences, competenceChange] = useState(currentThemeSkill.competences);
  const initialLength = useRef(skills.length);

  const mounted = useDidMount(() => {
    list.call();
  });

  const lastCompetence: React.MutableRefObject<null | { _id: string; currentIndex: number; value: number }> = useRef(
    null,
  );

  const onContinueClick = () => {
    parcoursRequest({
      skills: skills.map(skill => {
        const baseSkill: ISkill = {
          theme: skill.theme._id,
          activities: skill.activities.map(({ _id }) => _id),
          competences: skill.competences.filter(({ value }) => value !== 0),
        };
        if (skill.theme._id !== match.params.id) return baseSkill;
        return { ...baseSkill, competences: competences.filter(({ value }) => value !== 0) };
      }),
    });
  };

  useDidUpdate(() => {
    if (!(parcoursFetching || error)) {
      if (initialLength.current === skills.length) {
        goNext();
      }
      initialLength.current = skills.length;
    }
  },           [parcoursFetching]);

  useDidUpdate(() => {
    competenceChange(currentThemeSkill.competences);
  },           [match.params.id]);

  const goBack = () => {
    history.replace({
      pathname: `/theme/${match.params.id}/activities`,
    });
  };

  const onConfirm = () => {
    const currentLastCompetence = lastCompetence.current;
    if (currentLastCompetence) {
      const { currentIndex, value, _id } = currentLastCompetence;
      const current = currentIndex === -1 ? undefined : competences[currentIndex];
      let currentCompetences = [...competences];
      if (currentIndex === -1) {
        currentCompetences = [
          ...currentCompetences,
          {
            _id,
            value,
          },
        ];
      } else if (current) {
        currentCompetences[currentIndex] = { ...current, value };
      }
      competenceChange(currentCompetences);
    }
  };

  const { data, fetching } = list;
  if (fetching || !mounted) return <LazyLoader />;
  if (isEmpty(data)) return <div>Aucun competence a afficher</div>;

  const checkSlectedNumberCompetence = (competences: any) => {
    let number = 0;

    forEach(competences, e => {
      if (e.value > 0) {
        number++;
      }
    });

    if (number >= 4) {
      return true;
    }

    return false;
  };
  const competenceComponents = data.map(competence => {
    const currentIndex = competences.findIndex(({ _id }) => competence._id === _id);
    const current = currentIndex === -1 ? undefined : competences[currentIndex];
    const buttons: JSX.Element[] = [];
    for (let i = 1; i <= 4; i += 1) {
      const selected = current && current.value >= i;
      const onClick = () => {
        if (
          !checkSlectedNumberCompetence(competences) ||
          (competences[currentIndex] != undefined && competences[currentIndex].value > 0)
        ) {
          if (i === 4 && !selected) {
            // save last id
            lastCompetence.current = { currentIndex, _id: competence._id, value: i };
            // open modal
            openModal(<ConfirmModal confirme={onConfirm} onCloseModal={closeModal} type={theme.type} />);
            return;
          }

          let currentCompetences = [...competences];
          if (currentIndex === -1) {
            currentCompetences = [
              ...currentCompetences,
              {
                _id: competence._id,
                value: i,
              },
            ];
          } else if (current) {
            currentCompetences[currentIndex] = { ...current, value: current.value !== i ? i : 0 };
          }
          competenceChange(currentCompetences);
        } else {
          openModal(
            <ConfirmModal
              confirme={onConfirm}
              text={'Tu as déjà sélectionné 4 compétences pour cette expérience'}
              onCloseModal={closeModal}
              isConfirm={false}
              type={theme.type}
            />,
          );
          return;
        }
      };
      buttons.push(
        <Stars
          title={!isEmpty(competence.niveau) ? competence.niveau[i - 1].title : ''}
          sub_title={!isEmpty(competence.niveau) ? competence.niveau[i - 1].sub_title : ''}
          onChange={onClick}
          checked={!!selected}
          style={{ margin: '0 5px' }}
          onClick={onClick}
          key={i}
          type={theme.type}
        />,
      );
    }
    return (
      <div key={competence._id} className={classes.title_stars}>
        <h1
          className={classNames(
            classes.title,
            current && current.value !== 0 && theme.type === 'professional'
              ? classes.title_active_pro
              : current && current.value !== 0
              ? classes.title_active
              : '',
          )}
        >
          {competence.title}
        </h1>
        <div style={{ display: 'flex' }}>{buttons}</div>
      </div>
    );
  });

  return (
    <Grid container padding={{ xl: 0 }} spacing={{ xl: 40, lg: 0 }} className={classes.container}>
      <Prompt
        when={!isEqual(currentThemeSkill.competences, competences.filter(({ value }) => value !== 0))}
        message={'Êtes-vous sûr de vouloir fermer cette page?\nVous allez perdre vos modifications'}
      />
      <div className={classNames('colorful_bar', classes.bar_color)} />
      <Grid item xl={4} className={classes.experiences}>
        <Experiences title="Mes activités" experience={currentThemeSkill.activities} OnClick={goBack} />
      </Grid>

      <Grid item xl={8} lg={12} className={classes.list_stars}>
        <Grid container padding={{ xl: 0 }} spacing={{ xl: 0 }}>
          <Grid item xl={12} sm={12}>
            <Info
              borderColor={theme.type === 'professional' ? '#f9e5de' : '#ede7ff'}
              backgroundColor={theme.type === 'professional' ? '#f9f3f3' : '#f9f3f3'}
              className={theme.type === 'professional' ? classes.info_pro : classes.info_perso}
            >
              <span>Choisis 3 ou 4 compétences qui t'ont été utiles dans cette situation</span>
              <br />
              <span className={classes.italic_text}>
                passe la souris sur les étoiles pour choisir le niveau qui te correspond
              </span>
            </Info>
          </Grid>
          <Grid item xl={12}>
            {competenceComponents}
          </Grid>
        </Grid>
      </Grid>
      <Grid item xl={12} className={'flex_center'}>
        <ContinueButton
          disabled={competences.filter(({ value }) => value !== 0).length === 0}
          onClick={onContinueClick}
          isFetching={parcoursFetching}
          label={nextUrl ? 'EXPERIENCE SUIVANTE' : 'Terminer cette partie'}
          className={theme.type === 'professional' ? classes.button_pro : classes.buttonPerso}
        />
      </Grid>
    </Grid>
  );
};

const mapStateToProps = (state: ReduxState, { match }: RouteComponentProps<{ id: string }>): IMapToProps => ({
  currentThemeSkill: currentThemeSelector(match.params.id)(state),
  skills: state.parcours.data.skills,
  parcoursFetching: state.parcours.fetching,
  error: state.parcours.error,
});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>): IDispatchToProps => ({
  parcoursRequest: args => dispatch(parcoursActions.parcoursRequest(args)),
  openModal: (children: any) => dispatch(modalAction.openModal({ children })),
  closeModal: () => dispatch(modalAction.closeModal()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withApis({ list: listCompetences })(CompetenceContainer));
