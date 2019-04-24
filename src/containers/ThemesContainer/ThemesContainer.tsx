import React, { Dispatch } from 'react';
import { connect } from 'react-redux';

// types
import { RouteComponentProps } from 'react-router-dom';
import { ReduxState } from 'reducers';
import { AnyAction } from 'redux';

// Api
import withApi, { ApiComponentProps } from '../../hoc/withApi';
import { listThemes } from '../../requests/themes';

// actions

// hooks
import { useDidMount } from '../../hooks';
import parcoursActions from '../../reducers/parcours';

// styles
import classNames from '../../utils/classNames';
import classes from './themesContainer.module.scss';

interface IMapToProps {
  themes: string[];
}

interface IDispatchToProps {
  addTheme: (id: string) => void;
  removeTheme: (id: string) => void;
}

type Props = RouteComponentProps & ApiComponentProps<{ list: typeof listThemes }> & IMapToProps & IDispatchToProps;

const ThemesContainer = ({ list, themes, addTheme, removeTheme, history }: Props) => {
  useDidMount(() => {
    list.call();
  });

  const onClick = () => {
    history.push(`/theme/${themes[0]}`);
  };

  if (list.fetching) return <div>...loading</div>;
  const { data } = list.data;
  let themesComponents: JSX.Element[] = [];
  if (data) {
    themesComponents = data.map(theme => {
      const selected = themes.find(id => id === theme._id);
      const onClick = () => {
        const action = selected ? removeTheme : addTheme;
        action(theme._id);
      };
      return (
        <button
          key={theme._id}
          className={classNames(classes.theme, selected && classes.theme_selected)}
          onClick={onClick}
        >
          {theme.title}
        </button>
      );
    });
  }

  return (
    <div>
      {themesComponents}
      <button disabled={themes.length === 0} onClick={onClick}>
        Next
      </button>
    </div>
  );
};

const mapStateToProps = ({ parcours }: ReduxState): IMapToProps => ({
  themes: parcours.themes,
});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>): IDispatchToProps => ({
  addTheme: id => dispatch(parcoursActions.addTheme({ id })),
  removeTheme: id => dispatch(parcoursActions.removeTheme({ id })),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withApi({ list: listThemes })(ThemesContainer));
