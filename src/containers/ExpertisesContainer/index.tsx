import React, {
 useState, useEffect, Ref, forwardRef,
} from 'react';
import { RouteComponentProps } from 'react-router-dom';
import withLayout from 'hoc/withLayout';
import { connect } from 'react-redux';
import withApis, { ApiComponentProps } from 'hoc/withApi';
import { useCaptureRef } from 'hooks/useCaptureRef';
import ReactTooltip from 'react-tooltip';
import { Dispatch, AnyAction } from 'redux';

import { ReduxState, IParcoursResponse, IExpertise } from 'reducers';
import { getParcours } from 'requests';
import { useDidMount, useDidUpdate } from 'hooks';

import ParcoursActions from '../../reducers/parcours';
import classes from './ExpertisesContainer.module.scss';
import ApparationCard from '../../components_v3/ApparationCard';
import warning from '../../assets/icons/warning.svg';
import GraduationLevel from '../../components_v3/GraduationLevel';

interface CompetencesValue {
  _id: string;
  value: number;
}
interface updateparcoursParam {
  id: string;
  competencesValue: CompetencesValue[];
}
interface MapToProps {
  parcours: IParcoursResponse;
  expertises: IExpertise[];
  parcoursFetching: boolean;
  parcoursError: string;
}
interface DispatchToProps {
  updateParcoursCompetences: (data: updateparcoursParam) => void;
}

interface Props
  extends RouteComponentProps,
    MapToProps,
    DispatchToProps,
    ApiComponentProps<{ get: typeof getParcours }> {
  type: 'personal' | 'professional';
}

interface RefProp {
  onFooterClick(button: string): void;
  footerButtonsProps: any;
}

const ExpertisesContainer = forwardRef(
  (
    {
      get,
      parcours,
      expertises,
      history,
      updateParcoursCompetences,
      parcoursFetching,
      parcoursError,
    }: Props,
    ref: Ref<RefProp>,
  ) => {
    const [progressActive, changeProgress] = useState([
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
    ]);
    const sortCompetences = (competences: any) => {
      if (competences) {
        return competences.sort((a: any, b: any) => {
          if (a.taux > 0 && b.taux > 0) {
            if (a.value === 0 && b.value !== 0) {
              return -1;
            }
            if (b.value === 0 && a.value !== 0) {
              return 1;
            }
            return 0;
          }
          if (a.taux > 0 && b.taux === 0) {
            return -1;
          }
          if (a.taux === 0 && b.taux > 0) {
            return 1;
          }
        });
      }
      return competences;
    };
    const [competences, setCompetences] = useState(get.data.globalCopmetences);
    const [barré, barréChange] = useState(false);

    useEffect(() => {
      if (get.data.globalCopmetences) {
        barréChange(
          get.data.globalCopmetences.some(function (el: any) {
            return el.taux > 0 && el.value === 0;
          }),
        );
        setCompetences(get.data.globalCopmetences);
      }
    });

    useDidMount(() => {
      get.call(parcours._id);
    });

    useDidUpdate(() => {
      if (!parcoursFetching && parcoursError === 'no error') {
        history.push('/profile/skills');
      }
    }, [parcours]);
    useDidUpdate(() => {
      if (get.data.globalCopmetences.length > 0) {
        setCompetences(sortCompetences(get.data.globalCopmetences));
      }
    }, [get.data.globalCopmetences]);
    function HandleSubmit() {
      const competencesValue: CompetencesValue[] = [];
      let validateSubmit: boolean = true;
      competences.forEach((item: any) => {
        if (item.value === 0 && item.taux !== 0) {
          validateSubmit = false;
        }
      });
      if (validateSubmit) {
        competences.forEach((item: any) => {
          if (item.value > 0) {
            competencesValue.push({ _id: item._id, value: item.value });
          }
        });
        const id: string = parcours._id;

        updateParcoursCompetences({ id, competencesValue });
      }
    }

    function onFooterClick(button: string) {
      if (button === 'valider') {
        HandleSubmit();
      }
      /*       history.push('/profile/pro');
       */
    }
    useCaptureRef({ onFooterClick, footerButtonsProps: { barré, disabled: barré } }, ref);
    function handleOpen(index: number) {
      const progress = [false, false, false, false, false, false, false, false, false, false];
      if (!progressActive[index]) {
        progress[index] = true;
      }

      changeProgress(progress);
    }
    function handleChangeValue(value: number, index: number) {
      const CompetencesCopy = [...competences];
      CompetencesCopy[index].value = value;
      setCompetences(CompetencesCopy);
    }
    function DoNothing() {}
    function RenderDescription(item: any, index: number): any {
      if (item.value > 0) {
        return (
          <span
            className={classes.info}
            data-for="description"
            data-tip={expertises[index].niveau[item.value - 1].title}
          >
            {expertises[index].niveau[item.value - 1].title}
          </span>
        );
      }
      if (item.taux > 0) {
        return (
          <div className={classes.info}>
            <img src={warning} alt="warning" className={classes.warningIcon} />
            <span style={{ color: 'red' }}>La compétence n&apos;est pas encore graduée</span>
          </div>
        );
      }
      return <div className={classes.info} />;
    }

    let calculGraduation = 0;
    if (get.data.globalCopmetences) {
      calculGraduation = get.data.globalCopmetences.reduce(
        (acc: any, item: any) => (item.taux !== 0 && item.value === 0 ? acc + 1 : acc),
        0,
      );
    }
    return (
      <div className={classes.Container}>
        <div className={classes.Header}>
          <span>TAUX D&lsquo;APPARITION</span>
          <span>{`GRADUATIONS ${calculGraduation}/10`}</span>
          <span>INFORMATION</span>
        </div>
        {competences
          && expertises
          && competences.map((item: any, index: number) => (
            <div
              className={classes.row}
              style={{
                backgroundColor: index % 2 ? '#f1f1f1' : 'white',
                height: progressActive[index] ? '20%' : '10%',
              }}
              key={`key${index + 1}`}
            >
              <div
                className={classes.subRow}
                style={{
                  height: progressActive[index] ? '50%' : '100%',
                }}
              >
                <ApparationCard
                  color={item.color}
                  taux={item.taux}
                  title={item.title}
                  withProgressBar
                  clickHandler={item.taux ? handleOpen : DoNothing}
                  active={progressActive[index]}
                  index={index}
                  style={{ width: '300px' }}
                />

                <GraduationLevel
                  level={item.value}
                  color={item.color}
                  withSub
                  index={index}
                  taux={item.taux}
                  handleChangeValue={item.taux ? handleChangeValue : DoNothing}
                  description={expertises[index].niveau}
                />
                {RenderDescription(item, index)}
                <ReactTooltip
                  id="description"
                  place="left"
                  type="info"
                  className={classes.tooltip}
                  multiline
                />
              </div>
              {progressActive[index] && expertises && (
                <div className={classes.themesGroupe}>
                  {competences[index].themes.map((theme: string, i: number) => (
                    <span className={classes.themes} key={`key${i + 1}`}>
                      {theme}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
      </div>
    );
  },
);
const mapStateToProps = ({ parcours, expertises }: ReduxState): MapToProps => ({
  parcours: parcours.data,
  expertises: expertises.data,
  parcoursFetching: parcours.fetching,
  parcoursError: parcours.error,
});
const mapDispatchToProps = (dispatch: Dispatch<AnyAction>): DispatchToProps => ({
  updateParcoursCompetences: (data: updateparcoursParam) =>
    dispatch(ParcoursActions.updateParcoursCompetences(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  { forwardRef: true },
)(withApis({ get: getParcours })(withLayout(ExpertisesContainer)));
