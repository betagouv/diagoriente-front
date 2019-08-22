import React, { useEffect, useState } from 'react';
import MultiIcon from 'components_v3/icons/multiIcon/multiIcon';
import Questions from 'components_v3/Questions/Questions';

import JobIcon from 'components_v3/icons/jobIcon/jobIcon';
import JobSelection from 'components_v3/jobSelection/jobSelction';
import { getOneJob, getMyJob } from 'requests';
import classes from './jobModal.module.scss';

interface Props {
  onCloseModal: () => void;
  confirme: () => void;
  id: string;
  parcoursId: string;
}
type IProps = Props;

const JobModal = ({
 onCloseModal, confirme, id, parcoursId,
}: IProps) => {
  const [data, setData] = useState<any>({});
  const [similaire, setSimilaire] = useState<any>([]);
  const onSubmit = () => {
    confirme();
    onCloseModal();
  };
  useEffect(() => {
    if (Object.keys(data).length === 0) {
      getOneJob(id)
        .then(response => {
          if (response.code === 200) {
            setData(response.data);
          }
        })
        .catch(e => {
          console.log(e);
        });
    }
    if (data) {
      const idSecteur = data.secteur && data.secteur[0]._id;
      getMyJob(parcoursId).then(response =>
        setSimilaire(
          response.data
            && response.data
              .flatMap(item => item)
              .filter(el => el.secteur[0] && el.secteur[0]._id === idSecteur),
        ));
    }
  });

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
          <span className={classes.title}>{data.title}</span>
        </div>
      </div>
      <Questions />
    </div>
  );
};
export default JobModal;
