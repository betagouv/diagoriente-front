import React from 'react';
import classes from './experiences.module.scss';
import classNames from '../../utils/classNames';
import check from '../../assets/icons/svg/checked.svg';
import Button from '../buttons/RoundButton/RoundButton';
interface Props {
  title: string;
  experience: any;
  OnClick: () => void;
}

const Experiences = ({
  className,
  experience,
  children,
  title,
  OnClick,
  ...other
}: React.HTMLAttributes<HTMLElement> & Props) => {
  return (
    <div className={classNames(classes.container, className)} {...other}>
      <div className={classes.title}>
        <span className={classes.title_text}>{title}</span>
      </div>
      {experience &&
        experience.map((item: any) => {
          return (
            <div key={item._id} className={classes.list}>
              <div className={classes.check_wrapper}>
                <img className={classes.check} src={check} alt="exists" />
              </div>
              <div className={classes.list_item}>{item.title}</div>
            </div>
          );
        })}
      <Button onClick={OnClick} className={classes.edit_button}>
        Modifier
      </Button>
    </div>
  );
};

export default Experiences;
