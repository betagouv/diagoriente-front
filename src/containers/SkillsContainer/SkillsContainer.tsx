import React, { forwardRef } from 'react';
import { connect } from 'react-redux';
import { find } from 'lodash';
import { RouteComponentProps } from 'react-router-dom';
import { ReduxState, IParcoursResponse, IExpertise, IUser } from 'reducers';

import classes from './skills.module.scss';
import withApis, { ApiComponentProps } from '../../hoc/withApi';
import { getParcours } from '../../requests';
import { useDidMount } from '../../hooks';
// assets
import { beta1x } from '../../assets/icons/logobeta/index';
import MultiIcon from '../../components_v3/icons/multiIcon/multiIcon';
import logo from '../../assets/icons/logo/Diagoriente_Logo.svg';

interface MapToProps {
  parcours: IParcoursResponse;
  expertises: IExpertise[];
  user: IUser | undefined;
}

interface Props extends RouteComponentProps, MapToProps, ApiComponentProps<{ getParcours: typeof getParcours }> {}

const SkillsContainer = ({ parcours, getParcours, expertises, history, user }: Props) => {
  useDidMount(() => {
    getParcours.call(parcours._id);
    console.log('filter', parcours.skills.map(skill => skill.activities.map(act => act.title)));
  });

  return (
    <div className={classes.container}>
      <div className={classes.card}>
        <div className={classes.header}>
          <div className={classes.titleContainer}>
            <span className={classes.headerTitle}>Carte de Competence</span>
            {user && (
              <span className={classes.userName}>
                de {user.profile.firstName} {user.profile.lastName}
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
                  onClick={() => history.push('/profile/perso')}
                  className={classes.multiOverride}
                />
              ) : (
                <>
                  <div className={classes.themesContainer}>
                    {parcours.skills
                      .filter(type => type.theme.type === 'personal')
                      .map((skill, index) => {
                        return (
                          <div className={classes.mapContainer} key={index}>
                            <div className={classes.hr} />
                            <span>{skill.theme.title}</span>
                          </div>
                        );
                      })}
                  </div>
                  <div className={classes.buttonWrapper}>
                    <MultiIcon
                      type="add"
                      Iconcolor="#7992bf"
                      width="35"
                      height="35"
                      onClick={() => history.push('/profile/perso')}
                    />
                  </div>
                </>
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
                  onClick={() => history.push('/profile/pro')}
                  className={classes.multiOverride}
                />
              ) : (
                <>
                  <div className={classes.themesContainer}>
                    {parcours.skills
                      .filter(type => type.theme.type === 'professional')
                      .map((skill, index) => {
                        return (
                          <div className={classes.mapContainer} key={index}>
                            <div className={classes.hr} />
                            <span>{skill.theme.activities}</span>
                          </div>
                        );
                      })}
                  </div>
                  <div className={classes.buttonWrapper}>
                    <MultiIcon
                      type="add"
                      Iconcolor="#7992bf"
                      width="35"
                      height="35"
                      onClick={() => history.push('/profile/pro')}
                    />
                  </div>
                </>
              )}
            </div>
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
        <div className={classes.footer}>
          <div className={classes.footerLogo}>
            <img className={classes.diag} src={logo} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({ parcours, expertises, authUser }: ReduxState): MapToProps => ({
  parcours: parcours.data,
  expertises: expertises.data,
  user: authUser.user.user,
});

export default connect(mapStateToProps)(withApis({ getParcours })(SkillsContainer));
