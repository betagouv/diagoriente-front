import React from 'react';
import classes from './VerticalStepper.module.scss';
/* import classNames from '../../../../utils/classNames';
*/ import { IFamille } from 'reducers';

interface IProps {
  handleClick: (index: number) => void;
  DisplayedFamily: number;
  selectedFamilys: IFamille[];
  listItems: IFamille[];
}

const VerticalStepper = ({ handleClick, DisplayedFamily, listItems, selectedFamilys }: IProps) => {
  return (
    <>
      {listItems.map((famille: IFamille, index: number) => (
        <div
          className={DisplayedFamily === index ? classes.stepperCIRCLE : classes.stepperCircle}
          onClick={() => handleClick(index)}
          /* style={selectedFamilys.findIndex(elem => elem._id === famille._id) >= 0 ?
             { backgroundColor: '#ffba27' }
              : {}
            } */
        />
      ))}
    </>
  );
};
export default VerticalStepper;
