import React, {
 Dispatch, useState, useRef, useEffect, Ref, forwardRef, Fragment,
} from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps, Prompt } from 'react-router-dom';
import { AnyAction } from 'redux';
import { isEqual } from 'lodash';

// hoc
import withApi, { ApiComponentProps } from 'hoc/withApi';
import withLayout from 'hoc/withLayout';

// api
import { listThemes, IUpdateParcoursParams } from 'requests';

// container
import ThemeContainer, { Step, ThemeRefObject } from 'containers/ThemeContainer/ThemeContainer';

// components
import Card from 'components_v3/ui/Card/Card';
import ThemeIcon from 'components_v3/icons/themeIcon/themeIcon';

// hooks
import { useDidUpdate, useCaptureRef } from 'hooks';

// reducers
import parcoursActions from 'reducers/parcours';
import modalActions from 'reducers/modal';

import {
 ReduxState, ITheme, IParcoursResponse, ISkillPopulated,
} from 'reducers';

// utils
import classNames from 'utils/classNames';

// styles
import MultiIcon from 'components_v3/icons/multiIcon/multiIcon';
import Input from 'components/form/Input/Input';
import DeleteModal from 'components/modals/DeleteModal/DeleteTheme';
import InvalidModal from 'components/modals/InvalidModal/InvalidModal';
import classes from './themesContainer.module.scss';

interface IMapToProps {
  parcours: IParcoursResponse;
  parcoursFetching: boolean;
  parcoursError: string;
}

interface IDispatchToProps {
  parcoursRequest: (args: IUpdateParcoursParams) => void;
  openModal: (children: JSX.Element, backdropClassName?: string) => void;
  closeModal: () => void;
}

interface Props
  extends RouteComponentProps,
    ApiComponentProps<{ list: typeof listThemes }>,
    IDispatchToProps,
    IMapToProps {
  type: 'personal' | 'professional';
}

interface RefProp {
  onFooterClick(button: string): void;
}

const ThemesContainer = forwardRef(
  (
    {
      list,
      parcours,
      type,
      parcoursRequest,
      parcoursFetching,
      parcoursError,
      history,
      openModal,
      closeModal,
    }: Props,
    ref: Ref<RefProp>,
  ) => {
    function getSkills(skills: ISkillPopulated[]) {
      return skills.filter(skill => skill.theme.type === type);
    }

    const currentSkills = getSkills(parcours.skills);

    function skillWithoutId(skill: ISkillPopulated) {
      return {
        type: skill.theme.type,
        theme: skill.theme._id,
        activities: skill.activities.map(({ _id }) => _id),
        competences: skill.competences,
      };
    }

    const [step, stepChange] = useState<Step | 'select_theme' | null>(
      !currentSkills.length ? 'select_theme' : null,
    );

    const [selectedTheme, selectedThemeChange] = useState<string | null>(null);
    const [skills, skillsChange] = useState(currentSkills);

    const newSkillRef = useRef<ThemeRefObject | null>(null);
    const editSkillsRefs = useRef<(ThemeRefObject | null)[]>([]);

    function onFooterClick(button: string) {
      if (button === 'valider') {
        parcoursRequest({
          skills: [
            ...skills.map(skillWithoutId),
            ...parcours.skills.filter(skill => skill.theme.type !== type).map(skillWithoutId),
          ],
        });
      }
    }

    useEffect(() => {
      list.call({ type });
      stepChange(!currentSkills.length ? 'select_theme' : null);
      selectedThemeChange(null);
      skillsChange(currentSkills);
      // eslint-disable-next-line
    }, [type]);

    useCaptureRef({ onFooterClick }, ref);

    useDidUpdate(() => {
      if (!parcoursFetching && !parcoursError) {
        history.push('/profile');
      }
    }, [parcoursFetching]);

    function isSkillValidInputs(skillRef: ThemeRefObject) {
      return skillRef.activities.length > 0 && skillRef.competences.length === 4;
    }

    function updateSkill() {
      const skillIndex = skills.findIndex(skill => skill.theme._id === selectedTheme);
      const newSkill = skillIndex !== -1 ? editSkillsRefs.current[skillIndex] : newSkillRef.current;

      if (newSkill && isSkillValidInputs(newSkill)) {
        // eslint-disable-next-line
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
        openModal(
          <InvalidModal
            onCloseModal={closeModal}
            text="Attention, il faut sélectionner 4 compétences!"
          />,
        );
      }
    }

    function onEditClick() {
      if (!selectedTheme) {
        // do nothing
      } else if (step === 'select_theme') {
        stepChange('activities_edit');
      } else if (step === 'activities_edit') {
        const newSkill = newSkillRef.current;

        if (newSkill && newSkill.activities.length === 0) {
          openModal(
            <InvalidModal
              onCloseModal={closeModal}
              text="Il faut au moins choisir une activité"
            />,
          );
        } else {
          stepChange('expertise_edit');
        }
      } else if (step === 'expertise_edit') {
        const newSkill = newSkillRef.current;
        if (newSkill && newSkill.competences.length !== 4) {
          openModal(
            <InvalidModal
              onCloseModal={closeModal}
              text="Attention, il faut sélectionner 4 compétences!"
            />,
          );
        } else {
          updateSkill();
        }
      }
    }

    function onCloseClick() {
      if (step === 'select_theme') {
        stepChange(null);
      } else if (step === 'activities_edit') {
        stepChange('select_theme');
      } else {
        stepChange('activities_edit');
      }
    }
    const [search, setSearch] = useState<string>('');
    function onSearch(e: React.ChangeEvent<HTMLInputElement>) {
      setSearch(e.target.value);
      list.call({ search, type });
    }

    function renderAdd() {
      if (!step || (selectedTheme && skills.find(skill => skill.theme._id === selectedTheme))) {
        return (
          <MultiIcon
            type="add"
            width="45"
            height="45"
            withText
            text="AJOUTER UNE EXPÉRIENCE"
            onClick={() => {
              selectedThemeChange(null);
              stepChange('select_theme');
            }}
          />
        );
      }

      return (
        <Card
          close={{ onClick: onCloseClick }}
          edit={{ onClick: onEditClick }}
          className={classes.themes}
        >
          {type === 'professional' && (
            <div className={classes.searchInputWrapper}>
              <Input
                name="rechercher"
                validation=""
                type="text"
                placeholder="kfc, entretien, ..."
                className={classes.searchInput}
                onChange={onSearch}
                value={search}
              />
            </div>
          )}

          {step === 'select_theme' ? (
            list.data.data
            && list.data.data
              .filter(theme => !skills.find(skill => skill.theme._id === theme._id))
              .map(theme => {
                const selected = theme._id === selectedTheme;

                function onClick() {
                  selectedThemeChange(selected ? null : theme._id);
                }
                return (
                  <div
                    onClick={onClick}
                    className={
                      selected
                        ? type === 'professional'
                          ? classes.wrapperPro
                          : classes.wrapperGrey
                        : classes.wrapper
                    }
                  >
                    {theme && theme.resources && type === 'personal' && (
                      <ThemeIcon title={theme.title} icon={theme.resources.icon} key={theme._id} />
                    )}
                    {theme && theme.resources && (
                      <span
                        className={classNames(
                          type === 'personal' ? classes.theme_title : classes.theme_titlePro,
                        )}
                        style={
                          type === 'personal'
                            ? { color: theme.resources.backgroundColor }
                            : { color: 'black' }
                        }
                      >
                        {theme.title}
                      </span>
                    )}
                  </div>
                );
              })
          ) : (
            <ThemeContainer
              ref={newSkillRef as any}
              key={selectedTheme as string}
              step={step}
              id={selectedTheme as string}
              type={type}
            />
          )}
        </Card>
      );
    }

    return (
      <Fragment>
        <Prompt
          when={!isEqual(skills.map(skillWithoutId), currentSkills.map(skillWithoutId))}
          message="les changements seront perdus"
        />

        <div className={classes.container}>
          <div className={classes.add}>{renderAdd()}</div>
          <div className={classes.themes_container}>
            {skills.map(({ theme }, index) => {
              const selected = theme._id === selectedTheme;
              function onEdit() {
                if (selected) {
                  updateSkill();
                  return;
                }
                selectedThemeChange(theme._id);
                stepChange('edit_all');
              }

              function onClose() {
                openModal(
                  <DeleteModal
                    onDelete={() =>
                      skillsChange(skills.filter(skill => skill.theme._id !== theme._id))
                    }
                    onCloseModal={closeModal}
                  />,
                );
              }

              function captureRef(editRef: ThemeRefObject | null) {
                const editSkills = editSkillsRefs.current;
                editSkills[index] = editRef;
                editSkillsRefs.current = editSkills;
              }
              return (
                <Card
                  close={{ onClick: onClose }}
                  edit={{ onClick: onEdit }}
                  selected={step === null}
                  key={theme._id}
                  className={classes.themes}
                >
                  <ThemeContainer
                    skill={skills.find(skill => skill.theme._id === theme._id)}
                    key={theme._id}
                    id={theme._id}
                    step={(selected && step ? step : 'show') as Step}
                    ref={captureRef as any}
                    type={type}
                  />
                </Card>
              );
            })}
          </div>
        </div>
      </Fragment>
    );
  },
);

const mapStateToProps = ({ parcours }: ReduxState): IMapToProps => ({
  parcours: parcours.data,
  parcoursFetching: parcours.fetching,
  parcoursError: parcours.error,
});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>): IDispatchToProps => ({
  parcoursRequest: args => dispatch(parcoursActions.parcoursRequest(args)),
  openModal: (children, backdropClassName) =>
    dispatch(modalActions.openModal({ children, backdropClassName })),
  closeModal: () => dispatch(modalActions.closeModal()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  { forwardRef: true },
)(withApi({ list: listThemes })(withLayout(ThemesContainer)));
