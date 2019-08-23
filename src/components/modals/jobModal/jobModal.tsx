import React, { useEffect, useState } from 'react';
import { isEmpty } from 'lodash';
import MultiIcon from 'components_v3/icons/multiIcon/multiIcon';
import Questions from 'components_v3/Questions/Questions';

import JobIcon from 'components_v3/icons/jobIcon/jobIcon';
import JobSelection from 'components_v3/jobSelection/jobSelction';
import { getOneJob, getMyJob, getParcours } from 'requests';
import RadarChart from 'components_v3/RadarChart/RadarChart';
import withApis, { ApiComponentProps } from 'hoc/withApi';
import { useDidMount, useDidUpdate } from 'hooks';
import classes from './jobModal.module.scss';

interface MyProps {
  onCloseModal: () => void;
  confirme: () => void;
  id: string;
  parcoursId: string;
}
type IProps = MyProps & ApiComponentProps<{ get: typeof getParcours }>;

const JobModal = ({
 onCloseModal, confirme, id, parcoursId, get,
}: IProps) => {
  const [data, setData] = useState<any>({});
  const [similaire, setSimilaire] = useState<any>([]);
  const [rendered, setRendered] = useState<any>(false);

  const onSubmit = () => {
    confirme();
    onCloseModal();
  };
  useDidMount(() => {
    get.call(parcoursId);
  });
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
    if (Object.keys(data).length === 0) {
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
  useDidUpdate(() => {
    if (!rendered && get && !isEmpty(get.data)) {
      console.log('object', get);
      const canvas: any = document.getElementById('canvas');
      const ctx = canvas.getContext('2d');
      RadarChart(ctx, get);
      setRendered(true);
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
      <div className={classes.body}>
        <div className={classes.left}>
          <div className={classes.top}>
            <span className={classes.descTitle}>Description</span>
            <span className={classes.descText}>{data.description}</span>
          </div>
          <div className={classes.bottom}>
            <span className={classes.descTitle}>Metiers similaires</span>
            {similaire
              .slice(0, 3)
              .filter((al: any) => al.title !== data.title)
              .map((el: any) => (
                <JobSelection title={el.title} className={classes.jobSelection} />
              ))}
          </div>
        </div>
        <div className={classes.right}>
          <canvas id="canvas" className={classes.canvas} width="300" height="200" />
        </div>
      </div>
      <div className={classes.footer}>
        <MultiIcon width="15" height="15" type="prev" withBorder />
        <MultiIcon width="37" height="37" type="validate" Iconcolor="#fab82d" />
        <MultiIcon width="15" height="15" type="next" withBorder />
      </div>
    </div>
  );
};
export default withApis({ get: getParcours })(JobModal);
