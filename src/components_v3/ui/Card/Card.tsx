import React from 'react';
import { Step } from 'containers/ThemeContainer/ThemeContainer';
import Button from 'components_v3/button/button';
import classes from './card.module.scss';
import classNames from '../../../utils/classNames';
import MultiIcon from '../../icons/multiIcon/multiIcon';

interface Props
  extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  edit: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;
  close: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;
  selected?: boolean;
  addTheme?: boolean;
  add?: boolean;
  step?: any;
}

const Card = ({
  edit,
  close,
  className,
  selected,
  add,
  addTheme,
  children,
  step,
  ...rest
}: Props) => {
  let closeText = 'supprimer';
  if (selected) {
    closeText = 'Annuler';
  }

  return (
    <div {...rest} className={classNames(classes.container, className)}>
      {children}
      <div className={classes.buttonsContainer}>
        <div {...close} className={classNames(classes.delete)}>
          {/* <MultiIcon
            type="remove"
            width="30"
            height="30"
            Iconcolor="#ff001f"
            withText
            text={closeText}
            textColor="#ff001f"
            style={{ fontSize: 14 }}
          /> */}
          <Button title={closeText} color="liteRed" />
        </div>
        {selected ? null : (
          <div {...edit} className={!selected ? classes.edit : classes.hideButton}>
            {/* <MultiIcon
              type="edit"
              width="30"
              height="30"
              Iconcolor="#7992BF"
              withText
              text="Modifier"
              textColor="#7992BF"
              style={{ fontSize: 14 }}
            /> */}
            <Button title="Modifier" color="blue" />
          </div>
        )}
        {!add ? null : (
          <div {...edit} className={!selected ? classes.edit : classes.hideButton}>
            {/* <MultiIcon
              type="edit"
              width="30"
              height="30"
              Iconcolor="#7992BF"
              withText
              text="Modifier"
              textColor="#7992BF"
              style={{ fontSize: 14 }}
            /> */}
            <Button title="Modifier" color="blue" />
          </div>
        )}
        {selected && !add ? (
          <div {...edit} className={selected ? classes.editAdd : classes.hideButton}>
            {/* <MultiIcon
              type="validate"
              width="30"
              height="30"
              Iconcolor="#ffc107"
              withText
              text="Valider"
              textColor="#ffc107"
              style={{ fontSize: 14 }}
            /> */}
            <Button title="Valider" color="blue" />
          </div>
        ) : (
          <div
            className={
              selected && addTheme
                ? classes.hideButton
                : selected
                ? classes.editAdd
                : classes.hideButton
            }
          >
            {/* <MultiIcon
              type="validate"
              width="30"
              height="30"
              Iconcolor="gray"
              withText
              text="continuer"
              textColor="gray"
              style={{ fontSize: 14 }}
            /> */}
            <Button title="continuer" color="red" style={{color: '#cccccc', borderColor: '#cccccc'}} />
          </div>
        )}
        {addTheme && add ? (
          <div {...edit} className={selected ? classes.editAdd : classes.hideButton}>
            {/* <MultiIcon
              type="validate"
              width="30"
              height="30"
              Iconcolor="#ffc107"
              withText
              text="continuer"
              textColor="#ffc107"
              style={{ fontSize: 14 }}
            /> */}
            <Button title="continuer" color="red" />
          </div>
        ) : (
          <div className={addTheme ? classes.editAdd : classes.hideButton}>
            {/* <MultiIcon
              type="validate"
              width="30"
              height="30"
              Iconcolor="gray"
              withText
              text="Enregistrer"
              textColor="gray"
              style={{ fontSize: 14 }}
            /> */}
            <Button title="Enregistrer" color="liteRed" style={{color: 'gray', borderColor: 'gray'}} />
          </div>
        )}
      </div>
    </div>
  );
};

Card.defaultProps = {
  edit: {},
  close: {},
};

export default Card;
