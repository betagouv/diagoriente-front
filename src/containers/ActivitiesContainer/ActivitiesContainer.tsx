import React, { MouseEvent } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { isEmpty, map } from 'lodash';
import { connect } from 'react-redux';

// types
import { ReduxState, ITheme, IActivity } from 'reducers';
import { Dispatch, AnyAction } from 'redux';

// actions
import parcoursActions from '../../reducers/parcours';
import { currentActivitiesSelector } from '../../selectors/parcours';
import Activity from '../../components/Activity/Activty';
import Info from '../../components/ui/Info/Info';
import Grid from '../../components/ui/Grid/Grid';

import classes from './ActivitiesContainer.module.scss';
import ContinueButton from '../../components/buttons/ContinueButtom/ContinueButton';
interface IMapToProps {
  activities: IActivity[];
}

interface IDispatchToProps {
  add: (activity: IActivity) => void;
  remove: (activity: IActivity) => void;
}

type Props = RouteComponentProps<{ id: string }> & { theme: ITheme } & IMapToProps & IDispatchToProps;

const ActivitiesContainer = ({ theme, activities, add, remove, history, match }: Props) => {
  const navigate = () => {
    history.push(`/theme/${match.params.id}/skills`);
  };

  if (isEmpty(theme.activities)) {
    return (
      <div>
        {'aucune activité à afficher'}
        <button onClick={navigate}>Next</button>
      </div>
    );
  }

  const activitiesComponents = map(theme.activities, activity => {
    const selected = activities.find(row => activity._id === row._id);
    const onClick = (e: React.ChangeEvent<HTMLInputElement>) => {
      const action = selected ? remove : add;
      action(activity);
    };

    return (
      <Activity
        title={activity.title}
        subTitle="Fusce vehicula dolor arcu, sit amet blandit dol."
        key={activity._id}
        selected={!!selected}
        onCheckChange={onClick}
        id={activity._id}
      />
    );
  });

  return (
    <div className={classes.activityContainer}>
      <Grid item xl={12} sm={8} smd={9} xs={6}>
        <Info borderColor="#ede7ff" backgroundColor="#f7f7ff">
          Je précise mes expérience
        </Info>
      </Grid>

      <Grid item xl={12} sm={8} smd={9} xs={6} className={classes.checkContainer}>
        {activitiesComponents}
      </Grid>
      <Grid
        item
        xl={12}
        sm={8}
        smd={9}
        xs={6}
        /*  style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} */
        className={'flex_center'}
      >
        <ContinueButton disabled={false} onClick={navigate} />
      </Grid>
    </div>
  );
};

const mapStateToProps = (state: ReduxState, { match }: RouteComponentProps<{ id: string }>): IMapToProps => ({
  activities: currentActivitiesSelector(state, match.params.id),
});

const mapDispatchToProps = (
  dispatch: Dispatch<AnyAction>,
  { match }: RouteComponentProps<{ id: string }>,
): IDispatchToProps => ({
  add: activity => dispatch(parcoursActions.addActivity({ activity, themeId: match.params.id })),
  remove: activity => dispatch(parcoursActions.removeActivity({ activity, themeId: match.params.id })),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ActivitiesContainer);
