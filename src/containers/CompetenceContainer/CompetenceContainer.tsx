import React, { MutableRefObject, useRef, useEffect } from 'react';
import { isEmpty } from 'lodash';
import { connect } from 'react-redux';

// types
import { Dispatch, AnyAction } from 'redux';
import { ReduxState, ITheme } from 'reducers';
import { RouteComponentProps } from 'react-router-dom';

// components
import LazyLoader from '../../components/ui/LazyLoader/LazyLoader';
import withApis, { ApiComponentProps } from '../../hoc/withApi';

// hooks
import { useDidMount } from '../../hooks';

// requests
import { listCompetences } from '../../requests';

// redux
import parcoursActions from '../../reducers/parcours';
import { currentCompetenceSelector } from '../../selectors/parcours';

interface IMapToProps {
  competences: { _id: string; value: number }[];
}

interface IDispatchToProps {
  competenceChange: (id: string, value: number) => void;
}

type Props = RouteComponentProps<{ id: string }> &
  ApiComponentProps<{ list: typeof listCompetences }> & { theme: ITheme; goNext: () => void } & IMapToProps &
  IDispatchToProps;

const CompetenceContainer = ({ list, competences, competenceChange, goNext }: Props) => {
  const mounted = useDidMount(() => {
    list.call();
  });

  const { data, fetching } = list;
  if (fetching || !mounted) return <LazyLoader />;
  if (isEmpty(data)) return <div>Aucun competence a afficher</div>;

  const competenceComponents = data.map(competence => {
    const buttons: JSX.Element[] = [];
    for (let i = 1; i <= 4; i += 1) {
      const current = competences.find(({ _id }) => competence._id === _id);
      const selected = current && current.value === i;
      const onClick = () => {
        competenceChange(competence._id, i);
      };
      buttons.push(
        <button style={{ margin: '0 5px' }} disabled={selected} onClick={onClick} key={i}>
          {i}
        </button>,
      );
    }

    return (
      <div key={competence._id}>
        {competence.title}
        {buttons}
      </div>
    );
  });
  return (
    <div>
      {competenceComponents}
      <button disabled={competences.length === 0} onClick={goNext}>
        Next
      </button>
    </div>
  );
};

const mapStateToProps = (state: ReduxState, { match }: RouteComponentProps<{ id: string }>): IMapToProps => ({
  competences: currentCompetenceSelector(state, match.params.id),
});

const mapDispatchToProps = (
  dispatch: Dispatch<AnyAction>,
  { match }: RouteComponentProps<{ id: string }>,
): IDispatchToProps => ({
  competenceChange: (id, value) => dispatch(parcoursActions.changeCompetence({ id, value, themeId: match.params.id })),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withApis({ list: listCompetences })(CompetenceContainer));
