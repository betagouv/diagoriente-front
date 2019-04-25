import React, { MouseEvent } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { isEmpty, map } from 'lodash';
import { connect } from 'react-redux';

// types
import { ITheme } from '../../requests/themes';
import { ReduxState } from 'reducers';
import { Dispatch, AnyAction } from 'redux';

// actions
import parcoursActions from '../../reducers/parcours';
import { currentActivitiesSelector } from '../../selectors/parcours';

interface IMapToProps {
  activities: string[];
}

interface IDispatchToProps {
  add: (id: string) => void;
  remove: (id: string) => void;
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
    const selected = activities.find(id => activity._id === id);
    const onClick = (e: MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      const action = selected ? remove : add;
      action(activity._id);
    };

    return (
      <button style={{ color: selected ? 'green' : '#000' }} onClick={onClick} key={activity._id}>
        {activity.title}
      </button>
    );
  });

  return (
    <div>
      {activitiesComponents}
      <button disabled={activities.length === 0} onClick={navigate}>
        Next
      </button>
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
  add: id => dispatch(parcoursActions.addActivity({ id, themeId: match.params.id })),
  remove: id => dispatch(parcoursActions.removeActivity({ id, themeId: match.params.id })),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ActivitiesContainer);
