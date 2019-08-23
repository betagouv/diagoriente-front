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
}

const VerticalStepper = ({
 handleClick, DisplayedFamily, listItems, selectedFamilys,
}: IProps) => (
  <Fragment>
    {listItems.map((famille: IFamille, index: number) => (
      <div
        className={DisplayedFamily === index ? classes.stepperCIRCLE : classes.stepperCircle}
        onClick={() => handleClick(index)}
      />
    ))}
  </Fragment>
);
export default VerticalStepper;
