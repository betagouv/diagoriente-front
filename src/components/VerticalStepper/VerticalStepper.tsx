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
  responses: { _id: string; selected: boolean }[];
}

const VerticalStepper = ({
  handleClick,
  DisplayedFamily,
  listItems,
  forQuestions,
  responses,
}: IProps) => {
  function getSelected<T>(
    array: T[],
    callback: (row: T, index: number, array: T[]) => boolean,
  ): { index: number; selected: boolean } {
    if (!array) {
      return { index: -1, selected: false };
    }
    const index = array.findIndex(callback);
    const selected = index !== -1;
    return { index, selected };
  }

  return (
    <Fragment>
      {listItems.map((famille: IFamille, index: number) => {
        if (!forQuestions) {
          return (
            <div
              key={famille._id}
              className={DisplayedFamily === index ? classes.stepperCIRCLE : classes.stepperCircle}
              onClick={() => handleClick(index)}
            />
          );
        }

        const { index: i, selected } = getSelected(responses, item => item._id === famille._id);

        let type = 'border';
        let Iconcolor = '#4D4D4D';

        if (selected) {
          type = responses[i].selected ? 'validate' : 'remove';
          Iconcolor = responses[i].selected ? '#00cfff' : '#ff0060';
        }

        return (
          <MultiIcons
            width="15"
            height="15"
            type={type as any}
            onClick={() => handleClick(index)}
            className={classes.btn_validate}
            Iconcolor={Iconcolor}
          />
        );
      })}
    </Fragment>
  );
};

VerticalStepper.defaultProps = {
  responses: [],
};

export default VerticalStepper;
