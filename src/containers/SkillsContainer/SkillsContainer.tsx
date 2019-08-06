import React, { Ref, forwardRef } from 'react';
import { connect } from 'react-redux';
import { find } from 'lodash';
import { RouteComponentProps } from 'react-router-dom';
import { ReduxState, IParcoursResponse, IExpertise } from 'reducers';

import withLayout from 'hoc/withLayout';
import withApis, { ApiComponentProps } from 'hoc/withApi';

import { getParcours } from 'requests';
import { useDidMount } from 'hooks';

import { useCaptureRef } from 'hooks/useCaptureRef';
import classes from './skills.module.scss';

interface MapToProps {
  parcours: IParcoursResponse;
  expertises: IExpertise[];
}

interface Props
  extends RouteComponentProps,
    MapToProps,
    ApiComponentProps<{ get: typeof getParcours }> {}

interface RefProp {
  onFooterClick(button: string): void;
}
const SkillsContainer = forwardRef(
  ({
 parcours, get, expertises, history,
}: Props, ref: Ref<RefProp>) => {
    useDidMount(() => {
      get.call(parcours._id);
    });
    function onFooterClick(button: string) {
      if (button === 'download') {
        // download pdf
      }
      if (button === 'print') {
        // print
      }
    }

    useCaptureRef({ onFooterClick }, ref);

    function pushRoute(route: string) {
      return function () {
        history.push(route);
      };
    }

    return (
      <div className={classes.container}>
        <div className={classes.card}>
          <div className={classes.header} />
          <div className={classes.content}>
            <div className={classes.left}>
              <div onClick={pushRoute('/profile/perso')} className={classes.item} />
              <div onClick={pushRoute('/profile/pro')} className={classes.item} />
            </div>
            <div className={classes.right}>
              {expertises.map(expertise => {
                const currentSkill = find(
                  get.data.globalCopmetences,
                  ({ _id }) => expertise._id === _id,
                );
                return (
                  <span className={classes.skill} key={expertise._id}>
                    {expertise.title}
                    {currentSkill ? currentSkill.value : 0}
                  </span>
                );
              })}
            </div>
          </div>
          <div className={classes.footer} />
        </div>
      </div>
    );
  },
);

const mapStateToProps = ({ parcours, expertises }: ReduxState): MapToProps => ({
  parcours: parcours.data,
  expertises: expertises.data,
});

export default connect(mapStateToProps)(
  withApis({ get: getParcours })(withLayout(SkillsContainer)),
);
