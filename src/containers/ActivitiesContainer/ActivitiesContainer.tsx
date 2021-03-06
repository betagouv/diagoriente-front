import React, { useState, useRef } from 'react';
import { RouteComponentProps, Prompt } from 'react-router-dom';
import { isEmpty, map, isEqual } from 'lodash';
import { connect } from 'react-redux';

// types
import { ReduxState, ITheme, ISkillPopulated } from 'reducers';
import { Dispatch, AnyAction } from 'redux';

// actions
import parcoursActions from '../../reducers/parcours';
import { currentThemeSelector } from '../../selectors/parcours';
import Activity from '../../components/Activity/Activty';
import Info from '../../components/ui/Info/Info';
import Grid from '../../components/ui/Grid/Grid';

import classes from './ActivitiesContainer.module.scss';
import ContinueButton from '../../components/buttons/ContinueButtom/ContinueButton';
import { IUpdateParcoursParams, ISkill } from '../../requests';

import classNames from '../../utils/classNames';

import { add, remove } from '../../utils/helpers';
import { useDidUpdate } from '../../hooks';

interface IMapToProps {
  currentThemeSkill: ISkillPopulated;
  skills: ISkillPopulated[];
  fetching: boolean;
  error: string;
}

interface IDispatchToProps {
  parcoursRequest: (args: IUpdateParcoursParams) => void;
}

interface Props extends RouteComponentProps<{ id: string }>, IMapToProps, IDispatchToProps {
  theme: ITheme;
}

const ActivitiesContainer = ({
  theme, // / check theme.type and change style if it's professional
  currentThemeSkill,
  history,
  match,
  parcoursRequest,
  skills,
  fetching,
  error,
}: Props) => {
  const [activities, activitiesChange] = useState(currentThemeSkill.activities);
  const initialLength = useRef(skills.length);

  const navigate = () => {
    history.replace(`/theme/${match.params.id}/skills`);
  };

  const onContinueClick = () => {
    parcoursRequest({
      skills: skills.map(skill => {
        const baseSkill: ISkill = {
          theme: skill.theme._id,
          activities: skill.activities.map(({ _id }) => _id),
          competences: skill.competences,
        };

        if (skill.theme._id !== match.params.id) return baseSkill;
        return { ...baseSkill, activities: activities.map(({ _id }) => _id) };
      }),
    });
  };

  useDidUpdate(() => {
    activitiesChange(currentThemeSkill.activities);
  }, [match.params.id]);

  useDidUpdate(() => {
    if (!(fetching || error)) {
      if (initialLength.current === skills.length) {
        navigate();
      }
      initialLength.current = skills.length;
    }
  }, [fetching]);

  if (isEmpty(theme.activities)) {
    return (
      <div>
        {'aucune activité à afficher'}
        <button onClick={navigate}>Next</button>
      </div>
    );
  }

  const activitiesComponents = map(theme.activities, activity => {
    const selected = activities.find(({ _id }) => activity._id === _id);
    const onClick = (e: React.ChangeEvent<HTMLInputElement>) => {
      const action = selected ? remove : add;
      const newActivities = action(activities, activity);
      activitiesChange(newActivities);
    };

    return (
      <Activity
        title={activity.title}
        subTitle={activity.description && activity.description}
        key={activity._id}
        selected={!!selected}
        onCheckChange={onClick}
        id={activity._id}
        type={theme.type}
      />
    );
  });

  return (
    <div className={classes.activityContainer}>
      <Prompt
        when={
          !isEqual(
            currentThemeSkill.activities.map(({ _id }) => _id),
            activities.map(({ _id }) => _id),
          )
        }
        message={'Êtes-vous sûr de vouloir fermer cette page?\nVous allez perdre vos modifications'}
      />
      <div className={classNames('colorful_bar', classes.bar_color)} />

      <Grid container padding={{ xl: 0 }} spacing={{ xl: 0 }}>
        <Grid item xl={12} sm={12} smd={12} xs={12}>
          <Info
            borderColor={theme.type === 'professional' ? '#f9e5de' : '#ede7ff'}
            backgroundColor={theme.type === 'professional' ? '#f9f3f3' : '#f9f3f3'}
            className={theme.type === 'professional' ? classes.info_pro : ''}
          >
            Sélectionne les activités que tu as déjà faites
          </Info>
        </Grid>

        <Grid item xl={12} sm={12} smd={12} xs={12}>
          <div className={classes.activitiesContainer}>{activitiesComponents}</div>
        </Grid>
        <Grid item xl={12} sm={8} smd={9} xs={6} className="flex_center">
          <ContinueButton
            disabled={theme.activities.length !== 0 && activities.length === 0}
            onClick={onContinueClick}
            isFetching={fetching}
            className={theme.type === 'professional' ? classes.button_pro : classes.buttonPerso}
          />
        </Grid>
      </Grid>
    </div>
  );
};

const mapStateToProps = (
  state: ReduxState,
  { match }: RouteComponentProps<{ id: string }>,
): IMapToProps => ({
  currentThemeSkill: currentThemeSelector(match.params.id)(state),
  skills: state.parcours.data.skills,
  fetching: state.parcours.fetching,
  error: state.parcours.error,
});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>): IDispatchToProps => ({
  parcoursRequest: args => dispatch(parcoursActions.parcoursRequest(args)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ActivitiesContainer);
