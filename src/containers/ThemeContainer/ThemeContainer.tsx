import React, { useRef, useState, forwardRef, useEffect, Ref } from 'react';
import { Route, Switch, Redirect, RouteComponentProps, Prompt } from 'react-router-dom';
import { AnyAction, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { ReduxState, ITheme, ISkillPopulated, IExpertise, IActivity } from 'reducers';
import { isEmpty, map, isEqual } from 'lodash';

// containers
import ActivitiesContainer from '../ActivitiesContainer/ActivitiesContainer';
import CompetenceContainer from '../CompetenceContainer/CompetenceContainer';

// components
import SideBar from '../../components/sideBar/SideBar/SideBar';
import SideBarMobile from '../../components/sideBar/SidebarMobile/SideBarMobile';
import PathStepper from '../../components/PathStepper/Path';
import Grid from '../../components/ui/Grid/Grid';
import LazyLoader from '../../components/ui/LazyLoader/LazyLoader';
import Title from '../../components/Title/Title';
import SuccessModal from '../../components/modals/SuccessModal/SuccessModal';
import classNames from '../../utils/classNames';
// not found
import NotFound from '../../layout/NotFound';

// api
import withApis, { ApiComponentProps } from '../../hoc/withApi';
import { getTheme, IUpdateParcoursParams } from '../../requests';

// actions
import modalActions from '../../reducers/modal';
import parcoursActions from '../../reducers/parcours';

// styles
import classes from './theme.module.scss';
import Spinner from '../../components/ui/Spinner/Spinner';
import { useDidMount } from '../../hooks';

interface IMapToProps {
  expertises: IExpertise[];
}

export type Step = 'activities_edit' | 'show' | 'expertise_edit' | 'edit_all';

interface Props extends IMapToProps, ApiComponentProps<{ get: typeof getTheme }> {
  id: string;
  step: Step;
  skill?: ISkillPopulated;
}

export interface ThemeRefObject {
  activities: IActivity[];
  competences: { _id: string; value: number }[];
}

const ThemeContainer = forwardRef(({ id, get, skill, step, expertises }: Props, ref?: Ref<ThemeRefObject>) => {
  const [activities, activitiesChange] = useState<IActivity[]>([]);
  const [competences, competencesChange] = useState<IExpertise[]>([]);

  const initialActivities = useRef(skill ? skill.activities.map(activity => activity) : []);
  const initialCompetences = useRef(
    skill ? expertises.filter(expertise => skill.competences.find(({ _id }) => expertise._id === _id)) : [],
  );

  const isEditRef = useRef(false);

  const isEdit = step !== 'show';

  function resetActivities() {
    initialActivities.current = skill ? skill.activities.map(activity => activity) : [];
    activitiesChange(initialActivities.current);
  }

  function resetCompetences() {
    initialCompetences.current = skill
      ? expertises.filter(expertise => skill.competences.find(({ _id }) => expertise._id === _id))
      : [];

    competencesChange(initialCompetences.current);
  }

  useEffect(() => {
    if (step === 'show') {
      isEditRef.current = false;
      resetActivities();
      resetCompetences();
    } else if (!isEditRef.current) {
      isEditRef.current = true;
      get.call(id);
    }
  },        [step]);

  useEffect(() => {
    if (ref) {
      if (typeof ref === 'function') {
        ref({ activities, competences: competences.map(({ _id }) => ({ _id, value: 5 })) });
      } else {
        (ref.current as any) = { activities, competences: competences.map(({ _id }) => ({ _id, value: 5 })) };
      }
      return () => {
        if (typeof ref === 'function') {
          ref(null);
        } else {
          (ref.current as any) = null;
        }
      };
    }
  });

  function getSelected<T>(
    array: T[],
    callback: (row: T, index: number, array: T[]) => boolean,
  ): { index: number; selected: boolean } {
    if (!isEdit) return { index: -1, selected: false };
    const index = array.findIndex(callback);
    const selected = index !== -1;
    return { index, selected };
  }

  const activitiesArray = step === 'activities_edit' || step === 'edit_all' ? get.data.activities : activities;
  const expertisesArray = step === 'expertise_edit' || step === 'edit_all' ? expertises : competences;

  return (
    <>
      <Prompt
        when={!isEqual(initialActivities.current, activities) || !isEqual(initialCompetences.current, competences)}
        message={'modif will be lost'}
      />
      <div className={classes.new_theme}>
        <div className={classes.new_theme_title}>{skill ? skill.theme.title : get.data.title}</div>
        <div className={classes.new_theme_activities}>
          {map(activitiesArray, activity => {
            const { index, selected } = getSelected(activities, ({ _id }) => activity._id === _id);

            const onClick = () => {
              if (isEdit) {
                const nextActivities = [...activities];
                if (selected) {
                  nextActivities.splice(index, 1);
                } else {
                  nextActivities.push(activity);
                }
                activitiesChange(nextActivities);
              }
            };

            return (
              <div
                onClick={onClick}
                className={classNames(classes.activities, selected && classes.activities_selected)}
                key={activity._id}
              >
                {activity.title}
              </div>
            );
          })}
        </div>
        <div className={classes.new_theme_skills}>
          {step !== 'activities_edit' &&
            map(expertisesArray, expertise => {
              const { index, selected } = getSelected(competences, ({ _id }) => _id === expertise._id);
              function onClick() {
                if (isEdit) {
                  const newCompetences = [...competences];

                  if (selected) {
                    newCompetences.splice(index, 1);
                  } else {
                    newCompetences.push(expertise);
                    if (newCompetences.length > 4) {
                      newCompetences.shift();
                    }
                  }
                  competencesChange(newCompetences);
                }
              }

              return (
                <div
                  className={selected ? classes.activities_selected : undefined}
                  key={expertise._id}
                  onClick={onClick}
                >
                  {expertise.title}
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
});

const mapStateToProps = ({ parcours, expertises }: ReduxState, { id }: { id: string }): IMapToProps => ({
  expertises: expertises.data,
});

export default connect(
  mapStateToProps,
  null,
  null,
  { forwardRef: true },
)(withApis({ get: getTheme })(ThemeContainer));
