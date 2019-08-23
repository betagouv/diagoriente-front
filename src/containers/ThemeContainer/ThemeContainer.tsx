import React, {
 useRef, useState, forwardRef, useEffect, Ref, Fragment, Dispatch,
} from 'react';
import { AnyAction } from 'redux';

import { connect } from 'react-redux';
import { map } from 'lodash';
import {
 ReduxState, ISkillPopulated, IExpertise, IActivity,
} from 'reducers';
import ReactTooltip from 'react-tooltip';
import modalActions from 'reducers/modal';

// containers
import { useCaptureRef } from 'hooks/useCaptureRef';

// components
import ApparationCard from 'components_v3/ApparationCard/index';
import ConfirmModal from 'components/modals/ConfirmStar/ComfirmModal';
import Spinner from 'components_v3/ui/Spinner/Spinner';
// utils
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
interface IDispatchToProps {
  openModal: (children: JSX.Element, backdropClassName?: string) => void;
  closeModal: () => void;
}
export type Step = 'activities_edit' | 'show' | 'expertise_edit' | 'edit_all';

interface Props extends IMapToProps, IDispatchToProps, ApiComponentProps<{ get: typeof getTheme }> {
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
  (
    {
 id, get, skill, step, expertises, type, openModal, closeModal,
}: Props,
    ref?: Ref<ThemeRefObject>,
  ) => {
    function getActivities(): IActivity[] {
      if (!skill) return [];
      return skill.activities.map(activity => activity);
    }

    function getExpertises() {
      const result: (IExpertise & { value: number })[] = [];

      if (skill) {
        expertises.forEach(expertise => {
          const index = skill.competences.findIndex(({ _id }) => expertise._id === _id);
          if (index !== -1) {
            result.push({ ...expertise, value: skill.competences[index].value });
          }
        });
      }

      return result;
    }

    const [activities, activitiesChange] = useState<IActivity[]>([]);
    const [competences, competencesChange] = useState<(IExpertise & { value: number })[]>([]);
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

    useEffect(() => {
      competencesChange(getExpertises());
    }, [expertises]);

    useCaptureRef(
      {
        activities,
        competences: competences.map(({ _id, value }) => ({ _id, value })),
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

    const isActivityEdit = step === 'activities_edit' || step === 'edit_all';
    const isExpertiseEdit = step === 'expertise_edit' || step === 'edit_all';
    const activitiesArray = isActivityEdit ? get.data.activities : activities;
    const expertisesArray = isExpertiseEdit ? expertises : competences;
    const iconData = get && get.data.resources ? get.data.resources.icon : '';
    const iconSkill = skill && skill.theme.resources ? skill.theme.resources.icon : '';
    const iconDataColor = get && get.data.resources ? get.data.resources.backgroundColor : '';
    const iconSkillcolor = skill && skill.theme.resources ? skill.theme.resources.backgroundColor : '';
    return (
      <Fragment>
        <div className={classes.new_theme}>
          <div className={classes.new_theme_title}>
            <div className={classes.logoContainer}>
              {type === 'personal' ? (
                <img src={iconData || iconSkill} alt="logo" className={classes.logo} />
              ) : null}
            </div>

            <span
              style={
                type === 'personal'
                  ? {
                      color: iconDataColor || iconSkillcolor,
                    }
                  : { color: 'black' }
              }
            >
              {skill ? skill.theme.title : get.data.title}
            </span>
          </div>
          <div
            className={
              isActivityEdit && isExpertiseEdit
                ? classes.new_theme_activities
                : isActivityEdit
                ? classes.fullNewThemeActivities
                : classes.new_theme_activities
            }
          >
            {!activitiesArray ? (
              <div className={classes.containerSpinner}>
                <Spinner />
              </div>
            ) : (
              map(activitiesArray, activity => {
                const { index, selected } = getSelected(
                  activities,
                  ({ _id }) => activity._id === _id,
                );

                const onClick = () => {
                  if (isActivityEdit) {
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
                    data-tip
                    data-for={activity._id}
                    onClick={onClick}
                    className={classNames(
                      classes.activities,
                      selected && classes.activities_selected,
                    )}
                    key={activity._id}
                  >
                    {!isActivityEdit ? (
                      <li
                        className={classes.title_activity}
                      
                      >
                        <span>{activity.title}</span>
                      </li>
                    ) : (
                      <div className={classes.activityCheck}>
                        <input type="checkbox" checked={selected} className={classes.chekboxAct} />
                        <span
                          className={classes.title_activity_check}
                          style={
                            selected
                              ? { color: iconSkillcolor === '#fff' ? 'black' : iconSkillcolor }
                              : {}
                          }
                        >
                          {activity.title}
                        </span>
                      </div>
                    )}
                    <ReactTooltip
                      id={activity._id}
                      place="right"
                      type="light"
                      className={classes.tooltip}
                    >
                      {activity.title}
                    </ReactTooltip>
                  </div>
                );
              })
            )}
          </div>
          <div className={classes.new_theme_skills}>
            {step !== 'activities_edit'
              && map(expertisesArray, expertise => {
                const { index, selected } = getSelected(
                  competences,
                  ({ _id }) => _id === expertise._id,
                );

                function onChange(value: number) {
                  if (isExpertiseEdit) {
                    const newCompetences = [...competences];

                    if (!value) {
                      newCompetences.splice(index, 1);
                    } else if (selected) {
                      newCompetences[index] = { ...competences[index], value };
                    } else if (competences.length < 4) {
                      newCompetences.push({ ...expertise, value });
                    } else {
                      // show max 4 competences pop up
                      openModal(
                        <ConfirmModal
                          onCloseModal={closeModal}
                          confirme={closeModal}
                          value={value}
                          text="vous avez déja selectionné 4 compétences"
                          isConfirm={false}
                        />,
                      );
                    }
                    competencesChange(newCompetences);
                  }
                }
                function checkboxHandler(expert: IExpertise) {
                  let newCompetences = [...competences];
                  if (selected) {
                    newCompetences = newCompetences.filter(item => item._id !== expert._id);
                  } else if (competences.length < 4) {
                    newCompetences = [...competences, { ...expert, value: 5 }];
                  } else {
                    openModal(
                      <ConfirmModal
                        onCloseModal={closeModal}
                        confirme={closeModal}
                        value={2}
                        text="vous avez déja selectionné 4 compétences"
                        isConfirm={false}
                      />,
                    );
                  }
                  competencesChange(newCompetences);
                }

                function getRequired() {
                  let result;
                  if (
                    step === 'activities_edit'
                    || step === 'expertise_edit'
                    || step === 'edit_all'
                  ) {
                    if (skill && skill.theme.required) {
                      result = skill.theme.required.some((item: any) => expertise._id === item);
                    } else {
                      result = get.data.required
                        && get.data.required.some((item: any) => expertise._id === item);
                    }
                  }
                  return result;
                }
                const test = getRequired();
                return (
                  <div
                    className={classNames(
                      classes.competence,
                      selected ? classes.activities_selected : undefined,
                    )}
                    key={expertise._id}
                  >
                    <ApparationCard
                      withDots={type === 'professional' && isExpertiseEdit}
                      withCheckBox={type === 'personal' && isExpertiseEdit}
                      color={expertise.color}
                      title={expertise.title}
                      state={selected ? competences[index].value : 0}
                      isChecked={selected}
                      clickHandler={onChange}
                      className={classes.titleFont}
                      expertise={expertise}
                      checkboxHandler={checkboxHandler}
                      favori={test}
                    />
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
const mapDispatchToProps = (dispatch: Dispatch<AnyAction>): IDispatchToProps => ({
  openModal: (children, backdropClassName) =>
    dispatch(modalActions.openModal({ children, backdropClassName })),
  closeModal: () => dispatch(modalActions.closeModal()),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  { forwardRef: true },
)(withApis({ get: getTheme })(ThemeContainer));
