import React from 'react';
import classes from './path.module.scss';

interface IProps {
  options: string[];
}
const PathStepper = ({ options }: IProps) => {

  const addSeparator = (length: number, index: number) => {
    if (length > index) {
      return <div className={classes.item}> > </div>;
    }
  };
  const isLast = (p: string, length: number, index: number) => {
    if (length === index) {
      return <div className={classes.item_selected}> {p} </div>;
    }
    return <div className={classes.item}> {p} </div>;
  };

  return (
    <div className={classes.container}>
      {['Accueil', ...options].map((p, index) => (
        <div key={p} className={classes.item_container}>
          {isLast(p, options.length, index)}
          {addSeparator(options.length, index)}
        </div>
      ),
      )}
    </div>

  );
};
PathStepper.defaultProps = {
  options: [],
};
export default PathStepper;
