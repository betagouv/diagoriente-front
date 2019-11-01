import React, { useState, useEffect } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import { connect } from 'react-redux';
import classes from './path.module.scss';

interface IProps {
  indexStep: number;
  stepName: string | null;
  steps: string[];
  onNavigateBack: (stepName: string) => void;
}
type Props = IProps & RouteComponentProps;

const Stepper = ({ steps, stepName, onNavigateBack }: Props) => {
  const [indexStep, setIndexStep] = useState(0);
  useEffect(() => {
    if (stepName === 'select_theme') {
      setIndexStep(0);
    } else if (stepName === 'activities_edit') {
      setIndexStep(1);
    } else if (stepName === 'expertise_edit') {
      setIndexStep(2);
    } else if (stepName === null) {
      setIndexStep(-1);
    }
  });
  const changeStep = (step: string) => {
    let stepToGo = '';
    if (step === 'Choix du thème') {
      stepToGo = 'select_theme';
    }
    if (step === 'Sélection des activités') {
      stepToGo = 'activities_edit';
    }
    if (step === 'Evaluation des compétences') {
      stepToGo = 'expertise_edit';
    }
    onNavigateBack(stepToGo);
  };

  return (
    <div className={classes.stepper_container}>
      {steps.map((step, i) => (
        <div key={step} className={classes.step_container}>
          <div className={classes.block} onClick={() => changeStep(step)}>
            <div className={classes.circle_container}>
              <div
                className={classes.step_content}
                style={
                  indexStep === i
                    ? { backgroundColor: '#ff0060', borderColor: '#ff0060' }
                    : indexStep >= i
                    ? { backgroundColor: '#00cfff' }
                    : { backgroundColor: '#fff' }
                }
              >
                <span
                  className={classes.step_content_title}
                  style={indexStep >= i ? { color: 'white' } : { color: '#00cfff' }}
                >
                  {i + 1}
                </span>
              </div>
            </div>
            {i < steps.length - 1 && (
              <div
                className={classes.bar}
                style={
                  indexStep > i ? { backgroundColor: '#00cfff' } : { backgroundColor: '#00cfff' }
                }
              />
            )}
          </div>
          <span className={classes.step_title} style={indexStep === i ? { color: '#ff0060' } : {}}>
            {step}
          </span>
        </div>
      ))}
    </div>
  );
};

export default connect(
  null,
  null,
)(withRouter(Stepper));
