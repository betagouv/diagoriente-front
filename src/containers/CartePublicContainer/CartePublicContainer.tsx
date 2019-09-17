import React, {
 Ref, forwardRef, Fragment, Dispatch,
} from 'react';
import { connect } from 'react-redux';
import { find, isEmpty } from 'lodash';
import { RouteComponentProps } from 'react-router-dom';
import { AnyAction } from 'redux';

import {
 ReduxState, IParcoursResponse, IExpertise, IUser,
} from 'reducers';

import withLayout from 'hoc/withLayout';
import withApis, { ApiComponentProps } from 'hoc/withApi';

import { getParcours, IUpdateParcoursParams, getPublicProfile } from 'requests';
import { useDidMount } from 'hooks';
import modalActions from 'reducers/modal';
import { useCaptureRef } from 'hooks/useCaptureRef';
import { beta1x } from 'assets/icons/logobeta/index';
import logo from 'assets/icons/logo/Diagoriente_Logo.svg';
import ApparationCard from 'components_v3/ApparationCard';
import GraduationLevel from 'components_v3/GraduationLevel';
import parcoursActions from 'reducers/parcours';

import { pdf2 } from 'utils/pdf';
import tutoWrapper, { TutoFns } from 'hoc/tutoWrapper';

/* import JobIcon from 'components_v3/icons/jobIcon/jobIcon'; */
import classes from './CartePublicContainer.module.scss';

interface MapToProps {
  parcours: IParcoursResponse;
  expertises: IExpertise[];
  user: IUser | undefined;
}
interface IDispatchToProps {
  openModal: (children: JSX.Element, backdropClassName?: string) => void;
  closeModal: () => void;
  parcoursRequest: (args: IUpdateParcoursParams) => void;
}

interface Props
  extends RouteComponentProps,
    MapToProps,
    IDispatchToProps,
    ApiComponentProps<{ get: typeof getParcours }>,
    TutoFns {}

interface RefProp {
  onFooterClick(button: string): void;
}
const SkillsContainer = forwardRef(({
 parcours, get, history, user,
}: Props, ref: Ref<RefProp>) => {
  useDidMount(() => {
    const userId = history.location.pathname.split('/')[2];
    get.call(userId);
  });
  async function onFooterClick(button: string) {
    if (!isEmpty(get.data) && !isEmpty(parcours)) {
      if (button === 'download') {
        pdf2(parcours, get, user);
      }
      if (button === 'print') {
        pdf2(parcours, get, user, true);
      }
    }
  }

  useCaptureRef({ onFooterClick }, ref);

  if (get.data.skills) {
    return (
      <div className={classes.container}>
        <div className={classes.card}>
          <div className={classes.header}>
            <div className={classes.titleContainer}>
              <span className={classes.headerTitle}>Carte de Compétences</span>
              {get.data.userId && (
                <span className={classes.userName}>
                  {`de ${get.data.userId.profile.firstName} ${get.data.userId.profile.lastName}`}
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

                {get.data.skills.filter((type: any) => type.theme.type === 'personal').length
                === 0 ? (
                  <div />
                ) : (
                  <Fragment>
                    <div className={classes.themesContainer}>
                      {get.data.skills
                        .filter((type: any) => type.theme.type === 'personal')
                        .map((skill: any) => (
                          <div className={classes.mapContainer} key={skill._id}>
                            <div className={classes.hr} />
                            <li>{skill.theme.title}</li>
                          </div>
                        ))}
                    </div>
                  </Fragment>
                )}
              </div>
              <div className={classes.item}>
                <span className={classes.experieceType}>EXPÉRIENCES PROFESSIONNELLES</span>

                {get.data.skills.filter((type: any) => type.theme.type === 'professional')
                  .length === 0 ? (
                    <div />
                ) : (
                  <Fragment>
                    <div className={classes.themesContainer}>
                      {get.data.skills
                        .filter((type: any) => type.theme.type === 'professional')
                        .map((skill: any) => (
                          <div className={classes.mapContainer} key={skill._id}>
                            <div className={classes.hr} />
                            <li>{skill.theme.title}</li>
                          </div>
                        ))}
                    </div>
                  </Fragment>
                )}
              </div>
            </div>
            <div className={classes.right}>
              {get.data.globalCopmetences.map((expertise: any, index: number) => {
                const currentSkill = find(
                  get.data.globalCopmetences,
                  ({ _id }) => expertise._id === _id,
                );

                return (
                  <div key={expertise._id} className={classes.competences}>
                    <ApparationCard
                      title={expertise.title}
                      color={currentSkill && currentSkill.color}
                      className={classes.titleFont}
                    />
                    <GraduationLevel
                      level={expertise && expertise.value}
                      color={expertise && expertise.color}
                      index={1}
                      modeShowOnly
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
  }
  return <></>;
});

const mapStateToProps = ({ parcours, expertises, authUser }: ReduxState): MapToProps => ({
  parcours: parcours.data,
  expertises: expertises.data,
  user: authUser.user.user,
});
const mapDispatchToProps = (dispatch: Dispatch<AnyAction>): IDispatchToProps => ({
  parcoursRequest: args => dispatch(parcoursActions.parcoursRequest(args)),
  openModal: (children, backdropClassName) =>
    dispatch(modalActions.openModal({ children, backdropClassName })),
  closeModal: () => dispatch(modalActions.closeModal()),
});

export default tutoWrapper(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(withApis({ get: getPublicProfile })(withLayout(SkillsContainer))),
);
