import React, {
 useRef, useState, forwardRef, useEffect, Ref, Fragment,
} from 'react';

import { connect } from 'react-redux';
import { map } from 'lodash';
import {
 ReduxState, ISkillPopulated, IExpertise, IActivity,
} from 'reducers';

// containers
import { useCaptureRef } from 'hooks/useCaptureRef';

// components
import classNames from 'utils/classNames';

// hoc
import withApis, { ApiComponentProps } from 'hoc/withApi';

// api
import { getTheme } from 'requests';

// styles
import classes from './theme.module.scss';

interface IMapToProps {
  expertises: IExpertise[];
}

export type Step = 'activities_edit' | 'show' | 'expertise_edit' | 'edit_all';

interface Props extends IMapToProps, ApiComponentProps<{ get: typeof getTheme }> {
  id: string;
  step: Step;
  skill?: ISkillPopulated;
  type: 'personal' | 'professional';
}

export interface ThemeRefObject {
  activities: IActivity[];
  competences: { _id: string; value: number }[];
}

const ThemeContainer = forwardRef(
  ({
 id, get, skill, step, expertises,
}: Props, ref?: Ref<ThemeRefObject>) => {
    function getActivities(): IActivity[] {
      if (!skill) return [];
      return skill.activities.map(activity => activity);
    }

    function getExpertises() {
      if (!skill) return [];
      return expertises.filter(expertise =>
        skill.competences.find(({ _id }) => expertise._id === _id));
    }

    const [activities, activitiesChange] = useState(getActivities());
    const [competences, competencesChange] = useState(getExpertises());

    const isEditRef = useRef(false);

    const isEdit = step !== 'show';

    useEffect(() => {
      if (step === 'show') {
        isEditRef.current = false;
        activitiesChange(getActivities());
        competencesChange(getExpertises());
      } else if (!isEditRef.current) {
        isEditRef.current = true;
        get.call(id);
      }
    }, [step]);

    useCaptureRef(
      {
        activities,
        competences: competences.map(({ _id }) => ({ _id, value: 5 })),
      },
      ref,
    );

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
      <Fragment>
        <div className={classes.new_theme}>
          <div className={classes.new_theme_title}>
            {skill ? skill.theme.title : get.data.title}
          </div>
          <div className={classes.new_theme_activities}>
            {map(activitiesArray, activity => {
              const { index, selected } = getSelected(
                activities,
                ({ _id }) => activity._id === _id,
              );

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
                  className={classNames(
                    classes.activities,
                    selected && classes.activities_selected,
                  )}
                  key={activity._id}
                >
                  {activity.title}
                </div>
              );
            })}
          </div>
          <div className={classes.new_theme_skills}>
            {step !== 'activities_edit'
              && map(expertisesArray, expertise => {
                const { index, selected } = getSelected(
                  competences,
                  ({ _id }) => _id === expertise._id,
                );
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
      </Fragment>
    );
  },
);

const mapStateToProps = ({ expertises }: ReduxState): IMapToProps => ({
  expertises: expertises.data,
});

export default connect(
  mapStateToProps,
  null,
  null,
  { forwardRef: true },
)(withApis({ get: getTheme })(ThemeContainer));
