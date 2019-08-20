import React, { Ref, forwardRef, Fragment } from 'react';
import { connect } from 'react-redux';
import { find, isEmpty } from 'lodash';
import { RouteComponentProps } from 'react-router-dom';

import {
 ReduxState, IParcoursResponse, IExpertise, IUser,
} from 'reducers';


import withLayout from 'hoc/withLayout';
import withApis, { ApiComponentProps } from 'hoc/withApi';

import { getParcours } from 'requests';
import { useDidMount } from 'hooks';

import { useCaptureRef } from 'hooks/useCaptureRef';
import { beta1x } from 'assets/icons/logobeta/index';
import MultiIcon from 'components_v3/icons/multiIcon/multiIcon';
import logo from 'assets/icons/logo/Diagoriente_Logo.svg';
import ApparationCard from 'components_v3/ApparationCard';
import GraduationLevel from 'components_v3/GraduationLevel';
/* import JobIcon from 'components_v3/icons/jobIcon/jobIcon'; */
import { pdf2 } from '../../utils/pdf';
import classes from './skills.module.scss';

interface MapToProps {
  parcours: IParcoursResponse;
  expertises: IExpertise[];
  user: IUser | undefined;
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
 parcours, get, history, expertises, user,
}: Props, ref: Ref<RefProp>) => {
    useDidMount(() => {
      get.call(parcours._id);
    });
    async function onFooterClick(button: string) {
      if (!isEmpty(get.data) && !isEmpty(parcours)) {
        if (button === 'download') {
          const div = document.getElementsByClassName(classes.container)[0];
          pdf2(parcours, get, user);
        }
        if (button === 'print') {
          pdf2(parcours, get, user, true);
        }
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
          <div className={classes.header}>
            <div className={classes.titleContainer}>
              <span className={classes.headerTitle}>Carte de Competence</span>
              {user && (
                <span className={classes.userName}>
                  {`de ${user.profile.firstName} ${user.profile.lastName}`}
                </span>
              )}
            </div>
            <div className={classes.logoWrapper}>
              <img src={beta1x} alt="" />
            </div>
          </div>
          <div className={classes.content}>
            <div className={classes.left}>
              <div className={classes.item}>
                <span className={classes.experieceType}>EXPÉRIENCES PERSONNELLES</span>

                {parcours.skills.filter(type => type.theme.type === 'personal').length === 0 ? (
                  <MultiIcon
                    type="add"
                    withText
                    text="Ajouter une experience"
                    Iconcolor="#7992bf"
                    width="65"
                    height="65"
                    onClick={pushRoute('/profile/perso')}
                    className={classes.multiOverride}
                  />
                ) : (
                  <Fragment>
                    <div className={classes.themesContainer}>
                      {parcours.skills
                        .filter(type => type.theme.type === 'personal')
                        .map(skill => (
                          <div className={classes.mapContainer} key={skill._id}>
                            <div className={classes.hr} />
                            <li>{skill.theme.title}</li>
                          </div>
                        ))}
                    </div>
                    <div className={classes.buttonWrapper}>
                      <MultiIcon
                        type="add"
                        Iconcolor="#7992bf"
                        width="35"
                        height="35"
                        onClick={pushRoute('/profile/perso')}
                      />
                    </div>
                  </Fragment>
                )}
              </div>
              <div className={classes.item}>
                <span className={classes.experieceType}>EXPÉRIENCES PROFESSIONNELLES</span>

                {parcours.skills.filter(type => type.theme.type === 'professional').length === 0 ? (
                  <MultiIcon
                    type="add"
                    withText
                    text="Ajouter une experience"
                    Iconcolor="#7992bf"
                    width="65"
                    height="65"
                    onClick={pushRoute('/profile/pro')}
                    className={classes.multiOverride}
                  />
                ) : (
                  <Fragment>
                    <div className={classes.themesContainer}>
                      {parcours.skills
                        .filter(type => type.theme.type === 'professional')
                        .map(skill => (
                          <div className={classes.mapContainer} key={skill._id}>
                            <div className={classes.hr} />
                            <li>{skill.theme.title}</li>
                            {/* skill.activities.map(activity => {
                              return (
                                <div className={classes.activityContainer}>
                                  <div className={classes.hr} />
                                  <span className={classes.activityTitle}>{activity.title}</span>
                                </div>
                              )
                            }) */}
                          </div>
                        ))}
                    </div>
                    <div className={classes.buttonWrapper}>
                      <MultiIcon
                        type="add"
                        Iconcolor="#7992bf"
                        width="35"
                        height="35"
                        onClick={pushRoute('/profile/pro')}
                      />
                    </div>
                  </Fragment>
                )}
              </div>
            </div>
            <div className={classes.right}>
              {expertises.map(expertise => {
                const currentSkill = find(
                  get.data.globalCopmetences,
                  ({ _id }) => expertise._id === _id,
                );
                // console.log(get.data.globalCopmetences);
                return (
                  <div className={classes.competences}>
                    <ApparationCard
                      title={expertise.title}
                      color={currentSkill && currentSkill.color}
                      className={classes.titleFont}
                    />
                    <GraduationLevel
                      level={currentSkill && currentSkill.value}
                      color={currentSkill && currentSkill.color}
                      index={1}
                    />
                  </div>
                );
              })}
            </div>
          </div>
          <div className={classes.footer}>
            <div className={classes.footerLogo}>
              <img className={classes.diag} src={logo} alt="" />
            </div>
          </div>
        </div>
      </div>
    );
  },
);

const mapStateToProps = ({ parcours, expertises, authUser }: ReduxState): MapToProps => ({
  parcours: parcours.data,
  expertises: expertises.data,
  user: authUser.user.user,
});

export default connect(mapStateToProps)(
  withApis({ get: getParcours })(withLayout(SkillsContainer)),
);
