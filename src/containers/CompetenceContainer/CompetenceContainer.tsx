import React, { MutableRefObject, useRef, useEffect } from 'react';
import { isEmpty } from 'lodash';
import { connect } from 'react-redux';

// types
import { Dispatch, AnyAction } from 'redux';
import { ReduxState, ITheme, IActivity } from 'reducers';
import { RouteComponentProps } from 'react-router-dom';

// components
import LazyLoader from '../../components/ui/LazyLoader/LazyLoader';
import withApis, { ApiComponentProps } from '../../hoc/withApi';
import Stars from '../../components/stars/stars';
import ContinueButton from '../../components/buttons/ContinueButtom/ContinueButton';
import Info from '../../components/ui/Info/Info';

// hooks
import { useDidMount } from '../../hooks';

// requests
import { listCompetences } from '../../requests';

// redux
import parcoursActions from '../../reducers/parcours';
import { currentCompetenceSelector, currentActivitiesSelector } from '../../selectors/parcours';
import classes from './comptences.module.scss';
import Experiences from '../../components/experiences/expreriences';
import classNames from '../../utils/classNames';

interface IMapToProps {
  competences: { _id: string; value: number }[];
  activities: IActivity[];
}

interface IDispatchToProps {
  competenceChange: (id: string, value: number) => void;
}

type Props = RouteComponentProps<{ id: string }> &
  ApiComponentProps<{ list: typeof listCompetences }> & { theme: ITheme; goNext: () => void } & IMapToProps &
  IDispatchToProps;

const CompetenceContainer = ({ list, activities, competences, competenceChange, goNext, history, match }: Props) => {
  const mounted = useDidMount(() => {
    list.call();
  });
  const goBack = () => {
    history.replace({
      pathname: `/theme/${match.params.id}/activities`,
    });
  };

  const { data, fetching } = list;
  if (fetching || !mounted) return <LazyLoader />;
  if (isEmpty(data)) return <div>Aucun competence a afficher</div>;

  const competenceComponents = data.map(competence => {
    const current = competences.find(({ _id }) => competence._id === _id);
    const buttons: JSX.Element[] = [];
    for (let i = 1; i <= 4; i += 1) {
      const current = competences.find(({ _id }) => competence._id === _id);
      const selected = current && current.value >= i;
      const onClick = () => {
        competenceChange(competence._id, i);
      };
      buttons.push(
        <Stars
          title={`${competence.title} niveau ${i} `}
          onChange={onClick}
          checked={!!selected}
          style={{ margin: '0 5px' }}
          onClick={onClick}
          key={i}
        />,
      );
    }
    return (
      <div key={competence._id} className={classes.title_stars}>
        <h1 className={current && current._id === competence._id ? classes.title_active : classes.title}>
          {competence.title}
        </h1>

        <div style={{ display: 'flex' }}> {buttons}</div>
      </div>
    );
  });
  return (
    <div style={{ display: 'flex' }} className="item-12">
      <div className={classNames('item-4 item-xl-3 ', classes.experiences)}>
        <Experiences title="Mes expériences" experience={activities} OnClick={goBack} />
      </div>
      <div className={classNames('item-8 item-xl-9 item-lg-10 item-md-12 item-smd-12 item-sm-12', classes.list_stars)}>
        <Info>J’évalue mes compétences</Info>
        {competenceComponents}
        <ContinueButton disabled={competences.length === 0} onClick={goNext} />
      </div>
    </div>
  );
};

const mapStateToProps = (state: ReduxState, { match }: RouteComponentProps<{ id: string }>): IMapToProps => ({
  competences: currentCompetenceSelector(state, match.params.id),
  activities: currentActivitiesSelector(state, match.params.id),
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
