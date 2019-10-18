import React, { Fragment, Dispatch, useState } from 'react';
import Button from 'components_v3/button/button';
import modalActions from 'reducers/modal';
import { AnyAction } from 'redux';
import { UpdateAlogSkills } from 'requests';
import { connect } from 'react-redux';
import withApis, { ApiComponentProps } from 'hoc/withApi';

import {
 ReduxState, IParcoursResponse
} from 'reducers';
import classes from './ModalCompJob.module.scss';

interface Prop {
  submitHandler: (skillsChecked: string[]) => void;
}
interface MapToProps {
  parcours: IParcoursResponse;
}
interface IDispatchToProps {
  closeModal: () => void;
}
interface Props
  extends MapToProps,
    IDispatchToProps,
    Prop,
    ApiComponentProps<{ patch: typeof UpdateAlogSkills }> {}

const Modal = ({
 parcours, closeModal, patch, submitHandler,
}: Props) => {
  const generateStatefromProps = (Type: string) => {
    const skills: boolean[] = [];
    parcours.skills
      .filter(type => type.theme.type === Type)
      .forEach(item => {
        if (parcours.skillsAlgo) {
          const selected = parcours.skillsAlgo.find((id: string) => id === item._id);
          if (selected) {
            skills.push(true);
          } else {
            skills.push(false);
          }
        }
      });
    return skills;
  };
  const [skillsCheckPerso, changecheckPerso] = useState(generateStatefromProps('personal'));
  const [skillsCheckPro, changecheckPro] = useState(generateStatefromProps('professional'));
  const [skillsChecked, changeskill] = useState<string[]>(
    parcours.skillsAlgo ? parcours.skillsAlgo : [],
  );
  const checkSkillperso = (index: number, id: string) => {
    const statecopy = [...skillsCheckPerso];
    statecopy[index] = !skillsCheckPerso[index];
    changecheckPerso(statecopy);
    let idsCopy: string[] = [...skillsChecked];

    if (!skillsCheckPerso[index]) {
      idsCopy.push(id);
    } else {
      idsCopy = idsCopy.filter(item => item !== id);
    }
    changeskill(idsCopy);
  };
  const checkSkillPro = (index: number, id: string) => {
    const statecopy = [...skillsCheckPro];
    statecopy[index] = !skillsCheckPro[index];
    changecheckPro(statecopy);
    let idsCopy: string[] = [...skillsChecked];

    if (!skillsCheckPro[index]) {
      idsCopy.push(id);
    } else {
      idsCopy = idsCopy.filter(item => item !== id);
    }
    changeskill(idsCopy);
  };

  return (
    <div className={classes.modalContainer}>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <span className={classes.titre}>
          {' '}
          Sélectionne les expériences qui te plaisent le plus :
        </span>
        <span className={classes.subtitle}>
          elles seront prises en compte dans les pistes-métiers que nous allons te proposer.
        </span>
      </div>

      <div className={classes.left}>
        <div className={classes.item}>
          <span className={classes.experieceType}>EXPÉRIENCES PERSONNELLES</span>

          {parcours.skills.filter(type => type.theme.type === 'personal').length === 0 ? (
            <div className={classes.emptyExperienceContainer}>
              <div className={classes.textEmptyContainer}>
                <span>Aucune expérience renseignée</span>
              </div>
              <div className={classes.emptyButton}>
                <Button title="ajouter" color="red" />
              </div>
            </div>
          ) : (
            <Fragment>
              <div className={classes.themesContainer}>
                {parcours.skills
                  .filter(type => type.theme.type === 'personal')
                  .map((skill, index) => (
                    <div
                      className={classes.mapContainer}
                      key={skill._id}
                      onClick={() => {
                        checkSkillperso(index, skill._id);
                      }}
                    >
                      <div className={classes.hr} />

                      <input
                        type="checkbox"
                        className={classes.chekboxAct}
                        style={
                          skillsCheckPerso[index] ? { background: '#ff0060', border: 'none' } : {}
                        }
                      />
                      <span
                        className={classes.title_activity_check}
                        style={skillsCheckPerso[index] ? { color: '#ff0060', fontWeight: 500 } : {}}
                      >
                        {skill.theme.title}
                      </span>
                    </div>
                  ))}
              </div>
            </Fragment>
          )}
        </div>
        <div className={classes.item}>
          <span className={classes.experieceType}>EXPÉRIENCES PROFESSIONNELLES</span>

          {parcours.skills.filter(type => type.theme.type === 'professional').length === 0 ? (
            <div className={classes.emptyExperienceContainer}>
              <div className={classes.textEmptyContainer}>
                <span>Aucune expérience renseignée</span>
              </div>
            </div>
          ) : (
            <Fragment>
              <div className={classes.themesContainer}>
                {parcours.skills
                  .filter(type => type.theme.type === 'professional')
                  .map((skill, index) => (
                    <div
                      className={classes.mapContainer}
                      key={skill._id}
                      onClick={() => {
                        checkSkillPro(index, skill._id);
                      }}
                    >
                      <div className={classes.hr} />

                      <input
                        type="checkbox"
                        className={classes.chekboxAct}
                        style={
                          skillsCheckPro[index] ? { background: '#ff0060', border: 'none' } : {}
                        }
                      />
                      <span
                        className={classes.title_activity_check}
                        style={skillsCheckPro[index] ? { color: '#ff0060', fontWeight: 500 } : {}}
                      >
                        {skill.theme.title}
                      </span>
                    </div>
                  ))}
              </div>
            </Fragment>
          )}
        </div>
      </div>
      <Button
        title="Confirmer"
        color="red"
        onClick={() => {
          submitHandler(skillsChecked);
        }}
      />
    </div>
  );
};
const mapStateToProps = ({ parcours }: ReduxState): MapToProps => ({
  parcours: parcours.data,
});
const mapDispatchToProps = (dispatch: Dispatch<AnyAction>): IDispatchToProps => ({
  closeModal: () => dispatch(modalActions.closeModal()),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withApis({ patch: UpdateAlogSkills })(Modal));
