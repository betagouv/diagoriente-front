import React, { Fragment } from 'react';
import { IFamille } from 'reducers';
import classes from './VerticalStepper.module.scss';
/* import classNames from '../../../../utils/classNames';
 */
interface IProps {
  handleClick: (index: number) => void;
  DisplayedFamily: number;
  selectedFamilys?: IFamille[] | any;
  listItems?: IFamille[] | any;
  forQuestions?: boolean;
  responses?: any[];
}

const VerticalStepper = ({
  handleClick,
  DisplayedFamily,
  listItems,
  forQuestions,
  responses,
}: IProps) => {
  console.log(responses);
  return (
    <Fragment>
      {listItems.map((famille: IFamille, index: number) =>
        (!forQuestions ? (
          <div
            key={famille._id}
            className={DisplayedFamily === index ? classes.stepperCIRCLE : classes.stepperCircle}
            onClick={() => handleClick(index)}
          />
        ) : (
          <React.Fragment>
            <MultiIcons
              width="15"
              height="15"
              type={DisplayedFamily === index && responses && responses[DisplayedFamily] === true ? 'validate' : 'remove'}
              onClick={() => handleClick(index)}
              className={classes.btn_validate}
              Iconcolor={DisplayedFamily === index && responses && responses[DisplayedFamily] === true ? '#00cfff' : '#ff0060'}
            />
          </React.Fragment>
        )))}
    </Fragment>
  );
};

export default VerticalStepper;
