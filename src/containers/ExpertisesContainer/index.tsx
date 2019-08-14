import React, {
 useState, useEffect, Ref, forwardRef,
} from 'react';
import { RouteComponentProps } from 'react-router-dom';
import withLayout from 'hoc/withLayout';
import { connect } from 'react-redux';
import withApis, { ApiComponentProps } from 'hoc/withApi';
import { useCaptureRef } from 'hooks/useCaptureRef';

import { ReduxState, IParcoursResponse, IExpertise } from 'reducers';
import { updateParcoursCompetences, getParcours } from 'requests';
import { useDidMount } from 'hooks';
import classes from './ExpertisesContainer.module.scss';
import ApparationCard from '../../components_v3/ApparationCard';
import warning from '../../assets/icons/warning.svg';
import GraduationLevel from '../../components_v3/GraduationLevel';

interface CompetencesValue {
  _id: string;
  value: number;
}
interface MapToProps {
  parcours: IParcoursResponse;
  expertises: IExpertise[];
}
interface Props
  extends RouteComponentProps,
    MapToProps,
    ApiComponentProps<{ get: typeof getParcours }> {
  type: 'personal' | 'professional';
}

interface RefProp {
  onFooterClick(button: string): void;
}

const ExpertisesContainer = forwardRef(
  ({
 get, parcours, expertises, history,
}: Props, ref: Ref<RefProp>) => {
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
    const [competences, setCompetences] = useState(get.data.globalCopmetences);
    useEffect(() => {
      setCompetences(get.data.globalCopmetences);
    });
    useDidMount(() => {
      get.call(parcours._id);
    });
    function pushRoute(route: string) {
      return function () {
        history.push(route);
      };
    }
    function HandleSubmit() {
      const CompetencesValue: CompetencesValue[] = [];
      let validateSubmit: boolean = true;
      competences.forEach((item: any) => {
        if (item.value === 0 && item.taux !== 0) {
          validateSubmit = false;
        }
      });
      if (validateSubmit) {
        competences.forEach((item: any) => {
          if (item.value > 0) {
            CompetencesValue.push({ _id: item._id, value: item.value });
          }
        });
        updateParcoursCompetences(parcours._id, CompetencesValue);
        history.push('/profile/pro');
      }
    }

    function onFooterClick(button: string) {
      if (button === 'valider') {
        // click
        HandleSubmit();
      }
    }
    useCaptureRef({ onFooterClick }, ref);

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
    function DoNothing(value: number, index: number) {}

    return (
      <div className={classes.Container}>
        <div className={classes.Header}>
          <span>TAUX D'APPARITION</span>
          <span>GRADUATIONS 9/10</span>
          <span>INFORMATION</span>
        </div>
        {get.data.globalCopmetences
          && get.data.globalCopmetences.map((item: any, index: number) => (
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
                  clickHandler={handleOpen}
                  active={progressActive[index]}
                  index={index}
                  style={{ width: '300px' }}
                />

                <GraduationLevel
                  level={item.value}
                  color={item.color}
                  title="neder"
                  withSub
                  index={index}
                  handleChangeValue={item.taux ? handleChangeValue : DoNothing}
                />
                {item.value > 0 ? (
                  <span className={classes.info}>
                    {expertises[index].niveau[item.value - 1].title}
                  </span>
                ) : item.taux > 0 ? (
                  <div className={classes.info}>
                    <img src={warning} alt="warning" className={classes.warningIcon} />
                    <span style={{ color: 'red' }}>La competences n'est pas encore graduée</span>
                  </div>
                ) : (
                  <div className={classes.info} />
                )}
              </div>
              {progressActive[index] && expertises && (
                <div className={classes.themesGroupe}>
                  {get.data.globalCopmetences[index].themes.map((theme: string, i: number) => (
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
});
export default connect(
  mapStateToProps,
  null,
  null,
  { forwardRef: true },
)(withApis({ get: getParcours })(withLayout(ExpertisesContainer)));
