import React, {
  Dispatch,
  useState,
  useRef,
  useEffect,
  Ref,
  RefObject,
  MutableRefObject,
  RefAttributes,
  forwardRef,
} from 'react';
import { connect } from 'react-redux';
import ReactTooltip from 'react-tooltip';
import { RouteComponentProps, Redirect, Prompt } from 'react-router-dom';
import { filter } from 'lodash';

// types
import { ReduxState, ITheme, IParcoursResponse, IActivity } from 'reducers';
import { AnyAction } from 'redux';
import { IUpdateParcoursParams, ISkill } from '../../requests';

// Api
import withApi, { ApiComponentProps } from '../../hoc/withApi';
import { listThemes } from '../../requests/themes';

// container
import ThemeContainer, { Step, ThemeRefObject } from '../ThemeContainer/ThemeContainer';

// components

import Card from '../../components_v3/ui/Card/Card';

import SideBar from '../../components/sideBar/SideBar/SideBar';
import SideBarMobile from '../../components/sideBar/SidebarMobile/SideBarMobile';
import PathStepper from '../../components/PathStepper/Path';
import Info from '../../components/ui/Info/Info';
import Grid from '../../components/ui/Grid/Grid';
import CardTheme from '../../components/cards/Card/Card';
import Title from '../../components/Title/Title';
import ContinueButton from '../../components/buttons/ContinueButtom/ContinueButton';
import classNames from '../../utils/classNames';

// utils
import { decodeUri } from '../../utils/url';

// hooks
import { useDidMount, useDidUpdate, useWillUnmount } from '../../hooks';
import themesActions from '../../reducers/themes';
import parcoursActions from '../../reducers/parcours';
import activityActions from '../../reducers/activity';
import modalActions from '../../reducers/modal';
// styles
import classes from './themesContainer.module.scss';
import LazyLoader from '../../components/ui/LazyLoader/LazyLoader';
import { func } from 'prop-types';
import withLayout from '../../hoc/withLayout';

interface IMapToProps {
  parcours: IParcoursResponse;
}

interface IDispatchToProps {
  addTheme: (theme: ITheme) => void;
  removeTheme: (theme: ITheme) => void;
  parcoursRequest: (args: IUpdateParcoursParams) => void;
  updateThemes: (themes: ITheme[]) => void;
  getActivity: (id: any) => void;
  openModal: (children: JSX.Element, backdropClassName?: string) => void;
  closeModal: () => void;
}

interface Props extends RouteComponentProps, ApiComponentProps<{ list: typeof listThemes }>, IMapToProps {
  type: 'personal' | 'professional';
}

interface RefProp {
  onFooterClick(button: string): void;
}

const ThemesContainer = forwardRef(({ list, parcours, type }: Props, ref: Ref<RefProp>) => {
  const [step, stepChange] = useState<Step | null>(!parcours.skills.length ? 'activities_edit' : null);
  const [selectedTheme, selectedThemeChange] = useState<string | null>(null);
  const [skills, skillsChange] = useState(parcours.skills);

  const newSkillRef = useRef<ThemeRefObject | null>(null);
  const editSkillsRefs = useRef<(ThemeRefObject | null)[]>([]);

  function onFooterClick(button: string) {
    if (button === 'valider') {
    }
  }

  useEffect(() => {
    list.call({ type });
    stepChange(!parcours.skills.filter(skill => skill.theme.type === type).length ? 'activities_edit' : null);
    selectedThemeChange(null);
    skillsChange(parcours.skills);
  },        [type]);

  useEffect(() => {
    if (ref) {
      if (typeof ref === 'function') ref({ onFooterClick });
      else (ref.current as any) = { onFooterClick };
    }
  });

  function isSkillValidInputs(skillRef: ThemeRefObject) {
    return skillRef.activities.length > 0 && skillRef.competences.length === 4;
  }

  function updateSkill() {
    const skillIndex = skills.findIndex(skill => skill.theme._id === selectedTheme);
    const newSkill = skillIndex !== -1 ? editSkillsRefs.current[skillIndex] : newSkillRef.current;
    if (newSkill && isSkillValidInputs(newSkill)) {
      const currentSkills = [...skills];
      if (skillIndex !== -1) {
        currentSkills[skillIndex] = {
          ...skills[skillIndex],
          activities: newSkill.activities,
          competences: newSkill.competences,
        };
      } else {
        currentSkills.push({
          type,
          theme: list.data.data.find(theme => selectedTheme === theme._id) as ITheme,
          activities: newSkill.activities,
          competences: newSkill.competences,
          _id: `__new__${skills.length}`,
        });
      }
      skillsChange(currentSkills);
      stepChange(null);
      selectedThemeChange(null);
    } else {
      alert(`invalid inputs:
        -activities must at least select one activity
        -must select 4 competences
      `);
    }
  }

  function onEditClick() {
    if (!selectedTheme) {
      // do nothing
    } else if (step === 'activities_edit') {
      const newSkill = newSkillRef.current;
      if (newSkill && newSkill.activities.length === 0) {
        alert(`invalid inputs:
        -activities must at least select one activity
      `);
      } else {
        stepChange('expertise_edit');
      }
    } else if (step === 'expertise_edit') {
      const newSkill = newSkillRef.current;
      if (newSkill && newSkill.competences.length !== 4) {
        alert(`invalid inputs:
        -must select 4 competences
      `);
      } else {
        updateSkill();
      }
    }
  }

  function onCloseClick() {
    if (step === 'activities_edit') {
      if (selectedTheme === null) {
        stepChange(null);
      } else {
        selectedThemeChange(null);
      }
    } else {
      stepChange('activities_edit');
    }
  }

  function renderAdd() {
    if (!step || (selectedTheme && skills.find(skill => skill.theme._id === selectedTheme))) {
      return (
        <span
          onClick={() => {
            selectedThemeChange(null);
            stepChange('activities_edit');
          }}
        >
          {'AJOUTER UNE EXPÉRIENCE'}
        </span>
      );
    }

    return (
      <Card close={{ onClick: onCloseClick }} edit={{ onClick: onEditClick }} className={classes.themes}>
        {!selectedTheme ? (
          list.data.data &&
          list.data.data
            .filter(theme => !skills.find(skill => skill.theme._id === theme._id))
            .map(theme => {
              function onClick() {
                selectedThemeChange(theme._id);
              }

              return (
                <span className={classes.theme_title} key={theme._id} onClick={onClick}>
                  {theme.title}
                </span>
              );
            })
        ) : (
          <ThemeContainer ref={newSkillRef as any} key={selectedTheme} step={step} id={selectedTheme} />
        )}
      </Card>
    );
  }

  return (
    <div className={classes.container}>
      <div className={classes.add}>{renderAdd()}</div>
      <div className={classes.themes_container}>
        {skills.map(({ theme }, index) => {
          const selected = theme._id === selectedTheme;
          function onEdit() {
            if (selected) return updateSkill();
            selectedThemeChange(theme._id);
            stepChange('edit_all');
          }

          function onClose() {
            skillsChange(skills.filter(skill => skill.theme._id !== theme._id));
          }

          function captureRef(ref: ThemeRefObject | null) {
            const editSkills = editSkillsRefs.current;
            editSkills[index] = ref;
            editSkillsRefs.current = editSkills;
          }

          return (
            <Card close={{ onClick: onClose }} edit={{ onClick: onEdit }} key={theme._id} className={classes.themes}>
              <ThemeContainer
                skill={skills.find(skill => skill.theme._id === theme._id)}
                key={theme._id}
                id={theme._id}
                step={selected && step ? step : 'show'}
                ref={captureRef as any}
              />
            </Card>
          );
        })}
      </div>
    </div>
  );
});

const mapStateToProps = ({ parcours }: ReduxState): IMapToProps => ({
  parcours: parcours.data,
});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>): IDispatchToProps => ({
  addTheme: theme => dispatch(themesActions.addTheme({ theme })),
  removeTheme: theme => dispatch(themesActions.removeTheme({ theme })),
  parcoursRequest: args => dispatch(parcoursActions.parcoursRequest(args)),
  updateThemes: themes => dispatch(themesActions.updateThemes({ themes })),
  getActivity: (id: any) => dispatch(activityActions.getActivityRequest(id)),
  openModal: (children, backdropClassName) => dispatch(modalActions.openModal({ children, backdropClassName })),
  closeModal: () => dispatch(modalActions.closeModal()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withApi({ list: listThemes })(withLayout(ThemesContainer)));
