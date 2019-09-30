import React, { Fragment } from 'react';
import { IFamille } from 'reducers';
import MultiIcons from 'components_v3/icons/multiIcon/multiIcon';
import classes from './VerticalStepper.module.scss';

interface IProps {
  handleClick: (index: number) => void;
  DisplayedFamily: number;
  selectedFamilys?: IFamille[] | any;
  listItems?: IFamille[] | any;
  forQuestions?: boolean;
}

const VerticalStepper = ({
 handleClick, DisplayedFamily, listItems, forQuestions,
}: IProps) => (
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
          {DisplayedFamily === index ? (
            <MultiIcons
              width="15"
              height="15"
              type="validate"
              onClick={() => handleClick(index)}
              className={classes.btn_validate}
              Iconcolor="#00cfff"
            />
          ) : (
            <MultiIcons
              width="15"
              height="15"
              type="remove"
              onClick={() => handleClick(index)}
              className={classes.btn_validate}
              Iconcolor="#e55e68"
            />
          )}
        </React.Fragment>
      )))}
  </Fragment>
);
export default VerticalStepper;
