import React, { useEffect, useState } from 'react';
import { isEmpty } from 'lodash';
import MultiIcon from 'components_v3/icons/multiIcon/multiIcon';
import Questions from 'components_v3/Questions/Questions';
import VerticalStepper from 'components/VerticalStepper/VerticalStepper';
import VideoContainer from 'components/VideoContainer/VideoContainer';
import EntrepriseForm from 'components_v3/EntrepriseForm/EntrepriseForm';
import JobIcon from 'components_v3/icons/jobIcon/jobIcon';
import JobSelection from 'components_v3/jobSelection/jobSelction';
import {
 getOneJob, getMyJob, getParcours, createFavorites, postResponseJobs,
} from 'requests';
import RadarChart from 'components_v3/RadarChart/RadarChart';
import withApis, { ApiComponentProps } from 'hoc/withApi';
import { useDidUpdate } from 'hooks';
import { Carousel } from 'react-responsive-carousel';
import Button from 'components_v3/button/button';
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
  addfav: () => void;
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
  addfav,
}: IProps) => {
  const [data, setData] = useState<any>({});
  const [similaire, setSimilaire] = useState<any>([]);
  const [DisplayedChild, changeDisplayedChild] = useState(0);
  const [responseQuestion, setResponseQuestion] = useState<responseProps[]>([]);
  useEffect(() => {
    get.call(parcoursId);
    getOnejob.call(id, parcoursId);
    getJobs.call(parcoursId);
    if (getOnejob.data) {
      setData(getOnejob.data);
		}
		
  }, [id]);
  useEffect(() => {
    if (getOnejob.data) {
      setData(getOnejob.data);
    }
  }, [getOnejob.fetching]);

  useEffect(() => {
    if (getJobs.data && !getJobs.fetching) {
      const idSecteur = getOnejob.data.secteur && getOnejob.data.secteur[0]._id;
      if (!isEmpty(getJobs.data)) {
        const similaireArray = getJobs.data
          .flatMap(item => item)
          .filter(el => el.secteur[0] && el.secteur[0]._id === idSecteur);
        setSimilaire(similaireArray);
      }
    }
  }, [getJobs.fetching]);
  useDidUpdate(() => {
    const idSecteur = getOnejob.data.secteur && getOnejob.data.secteur[0]._id;
    if (!isEmpty(getJobs.data)) {
      const similaireArray = getJobs.data
        .flatMap(item => item)
        .filter(el => el.secteur[0] && el.secteur[0]._id === idSecteur);
      setSimilaire(similaireArray);
    }
  }, [getJobs]);
  useDidUpdate(() => {
    if (!getOnejob.fetching && !get.fetching && !isEmpty(get)) {
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
            <div className={classes.titlePage}>
              <span className={classes.number}>1.</span>
              <span className={classes.textPage}>INFORMATION SUR CE MÉTIER</span>
            </div>
            <div className={classes.top}>
              <span className={classes.descTitle}>Description</span>
              <span className={classes.descText}>{data.description}</span>
              <div className={classes.info}>
                <span className={classes.bold2}>NIVEAU D’ACCÈS AU MÉTIER</span>
                <span className={classes.bold1}>{data.accessibility}</span>
                <span className={classes.bold2}>SALAIRE MOYEN</span>
                <span className={classes.bold1}>{data.salaire}</span>
              </div>
            </div>
            {/* <div className={classes.bottom}>
              <span className={classes.descTitle}>Metiers similaires</span>
              {similaire.length > 0
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
            </div> */}
          </div>
          <div className={classes.right}>
            <span className={classes.descTitle}>Metiers similaires</span>
            {similaire.length > 0
              && similaire
                .slice(0, 8)
                .filter((al: any) => al.title !== data.title)
                .map((el: any) => (
                  <JobSelection
                    title={el.title}
                    className={classes.jobSelection}
                    key={el.title}
                    big
                  />
                ))}
          </div>
        </div>
      ),
    },
    {
      _id: 1,
      content: (
        <div className={classes.body}>
          <div className={classes.left}>
            <div className={classes.titlePage}>
              <span className={classes.number}>2.</span>
              <span className={classes.textPage}> EN QUOI CE MÉTIER ME CORRESPOND ?</span>
            </div>
            <div className={classes.top} style={{ height: '35%' }}>
              <span className={classes.interestTitle}>INTÉRÊTS LIÉS À CE MÉTIER</span>
              <div className={classes.activities}>
                {!getOnejob.fetching && data.interests && data.interests.map((el: any, index: any) => {
                   // console.log(data.interests)
                    const name = el.nom.split('/');
                    return (
                      index <= 2 && (
                        <React.Fragment key={el.nom}>
                          <div className={classes.interestWrapper}>
                            <span className={classes.InterestNumber}>{index + 1}</span>
                            {name.map((title: string) => (
                              <span className={classes.titleInterest} key={title}>
                                {title}
                              </span>
                            ))}
                          </div>
                          {index <= 1 && <div className={classes.verticalLine} />}
                        </React.Fragment>
                      )
                    );
                  })}
              </div>
            </div>
            <div className={classes.bottom} style={{ height: '40%' }}>
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
            </div>
          </div>
          <div className={classes.right}>
            <canvas id="canvas" className={classes.canvas} width="300" height="200" />
          </div>
        </div>
      ),
    },

    /* {
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
    }, */
    {
      _id: 3,
      content: <EntrepriseForm title={data.title} />,
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
    addfav();
    onCloseModal();
  };
  // console.log(data);
  return (
    <div className={classes.wrapperModal}>
      {/* <MultiIcon
        type="remove"
        width="37"
        height="37"
        onClick={onCloseModal}
        className={classes.exit}
      /> */}
      <Button title="x" color="red" onClick={onCloseModal} className={classes.exit} />
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
        <div className={classes.btnContent}>
          <div className={classes.wrraperBtn}>
            <div className={classes.directionRowBtn}>
              {/* <div className={classes.directionRow}>
                <VerticalStepper
                  handleClick={changeDisplayedChild}
                  DisplayedFamily={DisplayedChild}
                  listItems={items}
                />
              </div> */}
              <div className={classes.directionRow}>
                {DisplayedChild > 0 && (
                  <Button
                    title=""
                    color="blue"
                    onClick={() => changeDisplayedChild(DisplayedChild - 1)}
                    className={classes.next}
                    type="prev"
                  />
                )}
                {/* <MultiIcon
                  width="37"
                  height="37"
                  type={update ? 'remove' : 'validate'}
                  Iconcolor={update ? '#e55d67' : '#fab82d'}
                  onClick={update ? e => remove(idFav || '', e) : () => handleClick()}
                /> */}
                {/* <Button
                  title="ajouter a ma selection"
                  color="red"
                  onClick={update ? e => remove(idFav || '', e) : () => handleClick()}
                  style={{ height: 50 }}
                /> */}
                {DisplayedChild < 2 && (
                  <Button
                    title=""
                    color="blue"
                    onClick={() => changeDisplayedChild(DisplayedChild + 1)}
                    type="next"
                    className={classes.next}
                  />
                )}
              </div>
            </div>
          </div>
          <div className={classes.directionRowBtn2}>
            {/* <MultiIcon
              width="15"
              height="15"
              type="next"
              className={classes.textbtn}
              withText
              text="Trouver mon immersion"
              withBorder
              onClick={() => changeDisplayedChild(items.length - 1)}
            /> */}
            <Button
              title="Trouver mon immersion"
              color="red"
              onClick={() => changeDisplayedChild(items.length - 1)}
              style={{ height: 50 }}
            />
          </div>
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
