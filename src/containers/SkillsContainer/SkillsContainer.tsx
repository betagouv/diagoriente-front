import React, { forwardRef } from 'react';
import { connect } from 'react-redux';
import { find } from 'lodash';
import { RouteComponentProps } from 'react-router-dom';
import { ReduxState, IParcoursResponse, IExpertise } from 'reducers';

import classes from './skills.module.scss';
import withApis, { ApiComponentProps } from '../../hoc/withApi';
import { getParcours } from '../../requests';
import { useDidMount } from '../../hooks';

interface MapToProps {
  parcours: IParcoursResponse;
  expertises: IExpertise[];
}

interface Props extends RouteComponentProps, MapToProps, ApiComponentProps<{ getParcours: typeof getParcours }> {}

const SkillsContainer = ({ parcours, getParcours, expertises, history }: Props) => {
  useDidMount(() => {
    getParcours.call(parcours._id);
  });

  return (
    <div className={classes.container}>
      <div className={classes.card}>
        <div className={classes.header} />
        <div className={classes.content}>
          <div className={classes.left}>
            <div onClick={() => history.push('/profile/perso')} className={classes.item} />
            <div onClick={() => history.push('/profile/pro')} className={classes.item} />
          </div>
          <div className={classes.right}>
            {expertises.map(expertise => {
              const currentSkill = find(getParcours.data.globalCopmetences, ({ _id }) => expertise._id === _id);
              return (
                <span className={classes.skill} key={expertise._id}>
                  {expertise.title} {currentSkill ? currentSkill.value : 0}
                </span>
              );
            })}
          </div>
        </div>
        <div className={classes.footer} />
      </div>
    </div>
  );
};

const mapStateToProps = ({ parcours, expertises }: ReduxState): MapToProps => ({
  parcours: parcours.data,
  expertises: expertises.data,
});

export default connect(mapStateToProps)(withApis({ getParcours })(SkillsContainer));
