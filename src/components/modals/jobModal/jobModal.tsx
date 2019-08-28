import React, { useEffect, useState } from 'react';
import { isEmpty } from 'lodash';
import MultiIcon from 'components_v3/icons/multiIcon/multiIcon';
import Questions from 'components_v3/Questions/Questions';
import VerticalStepper from 'components/VerticalStepper/VerticalStepper';
import VideoContainer from 'components/VideoContainer/VideoContainer';

import JobIcon from 'components_v3/icons/jobIcon/jobIcon';
import JobSelection from 'components_v3/jobSelection/jobSelction';
import {
 getOneJob, getMyJob, getParcours, createFavorites, postResponseJobs,
} from 'requests';
import RadarChart from 'components_v3/RadarChart/RadarChart';
import withApis, { ApiComponentProps } from 'hoc/withApi';
import { useDidUpdate } from 'hooks';
import { Carousel } from 'react-responsive-carousel';
import classes from './jobModal.module.scss';

type responseProps = {
  questionJobId: string;
  response: boolean;
};

interface MyProps {
  onCloseModal: () => void;
  confirme: () => void;
  id: string;
  parcoursId: string;
  fetchingParcours: boolean;
  answersJobs: (data: any) => void;
  update: boolean;
  getJobs: () => void;
  getOnejob: () => void;
  idFav?: string;
  remove: (id: string, e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
}

type IProps = MyProps &
  ApiComponentProps<{
    get: typeof getParcours;
    answersJobs: typeof postResponseJobs;
    getJobs: typeof getMyJob;
    getOnejob: typeof getOneJob;
  }>;

const JobModal = ({
  onCloseModal,
  id,
  parcoursId,
  get,
  answersJobs,
  update,
  getJobs,
  getOnejob,
  remove,
  idFav,
}: IProps) => {
  const [data, setData] = useState<any>({});
  const [similaire, setSimilaire] = useState<any>([]);
  const [DisplayedChild, changeDisplayedChild] = useState(0);
  const [responseQuestion, setResponseQuestion] = useState<responseProps[]>([]);

  useEffect(() => {
    get.call(parcoursId);
    getOnejob.call(id, parcoursId);
    getJobs.call(parcoursId);
  }, [id]);
  useEffect(() => {
    if (getOnejob.data) {
      setData(getOnejob.data);
    }
  }, [getOnejob.fetching]);

  useEffect(() => {
    if (getJobs.data) {
      const idSecteur = getOnejob.data.secteur && getOnejob.data.secteur[0]._id;
      const similaireArray = !isEmpty(getJobs.data)
        && getJobs.data
          .flatMap(item => item)
          .filter(el => el.secteur[0] && el.secteur[0]._id === idSecteur);
      setSimilaire(similaireArray);
    }
  }, [getJobs.fetching]);

  useDidUpdate(() => {
    if (!getOnejob.fetching && !get.fetching && !isEmpty(getOnejob.data)) {
      const canvas: any = document.getElementById('canvas');
      const ctx = canvas.getContext('2d');
      RadarChart(ctx, get, getOnejob);
    }
  }, [getOnejob.fetching, get.fetching]);

  const items = [
    {
      _id: 0,
      content: (
        <div className={classes.body}>
          <div className={classes.left}>
            <div className={classes.top}>
              <span className={classes.descTitle}>Description</span>
              <span className={classes.descText}>{data.description}</span>
            </div>
            <div className={classes.bottom}>
              <span className={classes.descTitle}>Metiers similaires</span>
              {similaire
                && similaire
                  .slice(0, 3)
                  .filter((al: any) => al.title !== data.title)
                  .map((el: any) => (
                    <JobSelection
                      title={el.title}
                      className={classes.jobSelection}
                      key={el.title}
                    />
                  ))}
            </div>
          </div>
          <div className={classes.right}>
            <canvas id="canvas" className={classes.canvas} width="300" height="200" />
          </div>
        </div>
      ),
    },

    {
      _id: 2,
      content: (
        <Questions
          questions={data.questionJobs}
          jobId={data._id}
          responseQuestion={responseQuestion}
          onChangeQuestion={setResponseQuestion}
          answersJobs={answersJobs}
          parcourId={parcoursId}
          onCloseModal={onCloseModal}
          update={update}
        />
      ),
    },
  ];
  if (data.link) {
    items.splice(1, 0, { _id: 1, content: <VideoContainer link={data.link} /> });
  }

  const handleClick = () => {
    createFavorites({
      job: id,
      parcour: parcoursId,
      interested: true,
    });
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
          <span className={classes.title}>{data.title}</span>
        </div>
      </div>
      <div className={classes.contentModal2}>
        <Carousel
          showThumbs={false}
          showIndicators={false}
          showStatus={false}
          width="100%"
          stopOnHover={false}
          onChange={index => changeDisplayedChild(index)}
          useKeyboardArrows
          showArrows={false}
          selectedItem={DisplayedChild}
          className={classes.carou}
        >
          {items.map(item => item.content)}
        </Carousel>
      </div>
      <div className={classes.footer}>
        <div className={classes.directionRow}>
          <VerticalStepper
            handleClick={changeDisplayedChild}
            DisplayedFamily={DisplayedChild}
            listItems={items}
          />
        </div>
        <div className={classes.directionRow}>
          <MultiIcon
            width="15"
            height="15"
            type="prev"
            withBorder
            onClick={() => changeDisplayedChild(DisplayedChild - 1)}
          />
          <MultiIcon
            width="37"
            height="37"
            type={update ? 'remove' : 'validate'}
            Iconcolor={update ? '#e55d67' : '#fab82d'}
            onClick={update ? e => remove(idFav || '', e) : () => handleClick()}
          />
          <MultiIcon
            width="15"
            height="15"
            type="next"
            withBorder
            onClick={() => changeDisplayedChild(DisplayedChild + 1)}
          />
        </div>
      </div>
    </div>
  );
};
export default withApis({
  get: getParcours,
  answersJobs: postResponseJobs,
  getJobs: getMyJob,
  getOnejob: getOneJob,
})(JobModal);
