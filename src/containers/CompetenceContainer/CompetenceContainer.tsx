import React, { MutableRefObject, useRef, useEffect } from 'react';
import { isEmpty } from 'lodash';
import { connect } from 'react-redux';

// types
import { Dispatch, AnyAction } from 'redux';
import { ReduxState, ITheme, IActivity } from 'reducers';
import { RouteComponentProps } from 'react-router-dom';

// components
import LazyLoader from '../../components/ui/LazyLoader/LazyLoader';
import withApis, { ApiComponentProps } from '../../hoc/withApi';
import Stars from '../../components/stars/stars';
import ContinueButton from '../../components/buttons/ContinueButtom/ContinueButton';
import Info from '../../components/ui/Info/Info';

// hooks
import { useDidMount } from '../../hooks';

// requests
import { listCompetences } from '../../requests';

// redux
import parcoursActions from '../../reducers/parcours';
import { currentCompetenceSelector, currentActivitiesSelector } from '../../selectors/parcours';
import classes from './comptences.module.scss';
import Experiences from '../../components/experiences/expreriences';
import classNames from '../../utils/classNames';
import Grid from '../../components/ui/Grid/Grid';

interface IMapToProps {
  competences: { _id: string; value: number }[];
  activities: IActivity[];
}

interface IDispatchToProps {
  competenceChange: (id: string, value: number) => void;
}

type Props = RouteComponentProps<{ id: string }> &
  ApiComponentProps<{ list: typeof listCompetences }> & { theme: ITheme; goNext: () => void } & IMapToProps &
  IDispatchToProps;

const CompetenceContainer = ({ list, activities, competences, competenceChange, goNext, history, match }: Props) => {
  const mounted = useDidMount(() => {
    list.call();
  });
  const goBack = () => {
    history.replace({
      pathname: `/theme/${match.params.id}/activities`,
    });
  };

  const { data, fetching } = list;
  if (fetching || !mounted) return <LazyLoader />;
  if (isEmpty(data)) return <div>Aucun competence a afficher</div>;

  const competenceComponents = data.map(competence => {
    const current = competences.find(({ _id }) => competence._id === _id);
    const buttons: JSX.Element[] = [];
    for (let i = 1; i <= 4; i += 1) {
      const selected = current && current.value >= i;
      const onClick = () => {
        if (current && current.value !== i) {
          competenceChange(competence._id, i);
        } else {
          competenceChange(competence._id, 0);
        }
      };
      buttons.push(
        <Stars
          title={`${competence.title} niveau ${i} `}
          onChange={onClick}
          checked={!!selected}
          style={{ margin: '0 5px' }}
          onClick={onClick}
          key={i}
        />,
      );
    }
    return (
      <div key={competence._id} className={classes.title_stars}>
        <h1 className={classNames(classes.title, current && current.value !== 0 && classes.title_active)}>
          {competence.title}
        </h1>
        <div style={{ display: 'flex' }}>{buttons}</div>
      </div>
    );
  });
  return (
    <Grid container padding={{ xl: 0 }} spacing={{ xl: 40, lg: 0 }} className={classes.container}>
            <div className={classNames('colorful_bar', classes.bar_color)} />
      <Grid item xl={4} className={classes.experiences}>
        <Experiences title="Mes Experiences" experience={activities} OnClick={goBack} />
      </Grid>

      <Grid item xl={8} lg={12} className={classes.list_stars}>
        <Grid container padding={{ xl: 0 }} spacing={{ xl: 0 }}>
          <Grid item xl={12}>
            <Info>J’évalue mes compétences</Info>
          </Grid>
          <Grid item xl={12}>
            {competenceComponents}
          </Grid>
        </Grid>
      </Grid>
      <Grid item xl={12} className={'flex_center'}>
        <ContinueButton
          className={classes.continue_button}
          disabled={competences.filter(({ value }) => value !== 0).length === 0}
          onClick={goNext}
        />
      </Grid>
    </Grid>
  );
};

const mapStateToProps = (state: ReduxState, { match }: RouteComponentProps<{ id: string }>): IMapToProps => ({
  competences: currentCompetenceSelector(state, match.params.id),
  activities: currentActivitiesSelector(state, match.params.id),
});

const mapDispatchToProps = (
  dispatch: Dispatch<AnyAction>,
  { match }: RouteComponentProps<{ id: string }>,
): IDispatchToProps => ({
  competenceChange: (id, value) => dispatch(parcoursActions.changeCompetence({ id, value, themeId: match.params.id })),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withApis({ list: listCompetences })(CompetenceContainer));
