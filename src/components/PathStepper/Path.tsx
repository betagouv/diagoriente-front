import React, { useState, useEffect } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import classes from './path.module.scss';

interface IProps {
  indexStep: number;
  stepName: string | null;
  steps: string[];
}
type Props = IProps & RouteComponentProps;

const Stepper = ({ steps, stepName }: Props) => {
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

  return (
    <div className={classes.stepper_container}>
      {steps.map((step, i) => (
        <div key={step} className={classes.step_container}>
          <div className={classes.block}>
            <div className={classes.circle_container}>
              <div
                className={classes.step_content}
                style={
                  indexStep === i || indexStep >= i
                    ? { backgroundColor: '#7a93bc' }
                    : { backgroundColor: '#fff' }
                }
              >
                <span
                  className={classes.step_content_title}
                  style={indexStep >= i ? { color: 'white' } : { color: '#7a93bc' }}
                >
                  {i + 1}
                </span>
              </div>
            </div>
            {i < steps.length - 1 && (
              <div
                className={classes.bar}
                style={indexStep > i ? { backgroundColor: '#7a93bc' } : { backgroundColor: '#7a93bc' }}
              />
            )}
          </div>
          <span className={classes.step_title}>{step}</span>
        </div>
      ))}
    </div>
  );
};

export default connect(
  null,
  null,
)(withRouter(Stepper));
