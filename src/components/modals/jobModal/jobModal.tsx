import React from 'react';
import MultiIcon from 'components_v3/icons/multiIcon/multiIcon';
import Questions from 'components_v3/Questions/Questions';

import JobIcon from 'components_v3/icons/jobIcon/jobIcon';
import Grid from '../../ui/Grid/Grid';
import classes from './jobModal.module.scss';

interface Props {
  onCloseModal: () => void;
  confirme: () => void;
}
type IProps = Props;

const JobModal = ({ onCloseModal, confirme }: IProps) => {
  const onSubmit = () => {
    confirme();
    onCloseModal();
  };

  return (
    <div className={classes.wrapperModal}>
      <MultiIcon
        type="remove"
        width="37"
        height="37"
        onClick={onCloseModal}
        className={classes.exit}
      />
      <div className={classes.header}>
        <div className={classes.container}>
          <JobIcon width="55" height="55" color="#fab82d" />
        </div>
      </div>
      <Questions />
    </div>
  );
};
export default JobModal;
