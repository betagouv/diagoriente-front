import React, {
  Dispatch, useEffect, useState, useRef,
 } from 'react';
 import { connect } from 'react-redux';
 import {
  forEach, filter, map, isEmpty,
 } from 'lodash';
 import { RouteComponentProps } from 'react-router-dom';
 import modalActions from 'reducers/modal';
 import { AnyAction } from 'redux';
 
 import { ReduxState } from 'reducers';
 import withLayout from 'hoc/withLayout';
 import arrow from 'assets_v3/icons/arrow/arrowFIlter.png';
 import classNames from 'utils/classNames';
 import JobSelection from 'components_v3/jobSelection/jobSelction';
 import JobCard from 'components_v3/jobCard/jobCard';
 import JobModal from 'components/modals/jobModal/jobModal';
 import DeleteModal from 'components/modals/DeleteModal/DeleteTheme';
 import MultiIcon from 'components_v3/icons/multiIcon/multiIcon';
 import withApis, { ApiComponentProps } from '../../hoc/withApi';
 import {
   getMyJob,
   createFavorites,
   getParcours,
   getFavorites,
   IJob,
   getSecteurs,
   ISecteur,
   deleteFavorites,
 } from '../../requests';
 
 import { useDidMount, useDidUpdate } from '../../hooks';
 import Spinner from '../../components/ui/Spinner/Spinner';
 import classes from './jobsContainer.module.scss';
 import SideBar from '../../components/sideBar/SideBar/SideBar';
 
 interface IMapToProps {
   parcoursId: string;
   families: string[];
   fetchingParcours: boolean;
 }
 interface IDispatchToProps {
   openModal: (children: JSX.Element, backdropClassName?: string) => void;
   closeModal: () => void;
 }
 
 interface Props
   extends ApiComponentProps<{
       listJobs: typeof getMyJob;
       addFavorites: typeof createFavorites;
       getParcours: typeof getParcours;
       deleteFavorites: typeof deleteFavorites;
       getSecteurs: typeof getSecteurs;
       getFav: typeof getFavorites;
     }>,
     IDispatchToProps,
     IMapToProps {}
 
 const JobsContainer = ({
   listJobs,
   parcoursId,
   addFavorites,
   getParcours,
   getSecteurs,
   families,
   history,
   deleteFavorites,
   getFav,
   openModal,
   closeModal,
   fetchingParcours,
 }: Props & RouteComponentProps) => {
   const [fetching, fetchingChange] = useState(false);
   const [selectedSecteurs, selectedSecteursChange] = useState([] as string[]);
   const jobsListRef = useRef<IJob[]>([]);
 
   const [isSelectionOpen, setSelectionOpen] = useState(true);
   const [isRecommandedOpen, setRecommandedOpen] = useState(true);
   const [isOtherOpen, setOtherOpen] = useState(true);
 
   const setSelectionToggle = () => {
     setSelectionOpen(!isSelectionOpen);
   };
 
   const setRecommandedtoggle = () => {
     setRecommandedOpen(!isRecommandedOpen);
   };
   const setOthertoggle = () => {
     setOtherOpen(!isOtherOpen);
   };
 
   useDidMount(() => {
     getParcours.call(parcoursId);
     getSecteurs.call();
     getFav.call();
   });
   useEffect(() => {
     if (!addFavorites.fetching && !addFavorites.error) {
       listJobs.call(parcoursId);
     }
   }, [addFavorites.fetching]);
 
   /*  useEffect(() => {
     if (!getFav.fetching && !getFav.error) {
       getFav.call();
     }
   }, [getFav.fetching]); */
 
   useEffect(() => {
     if (!deleteFavorites.fetching && !deleteFavorites.error) {
       listJobs.call(parcoursId);
       getFav.call();
     }
   }, [deleteFavorites.fetching]);
 
   useDidUpdate(() => {
     fetchingChange(listJobs.fetching);
   }, [listJobs.fetching]);
 
   function filterJobs(filterArray: string[], secteurArray: string[]) {
     listJobs.call(parcoursId, JSON.stringify(filterArray), JSON.stringify(secteurArray));
   }
 
   const onJobRemove = (id: any, e?: React.MouseEvent<any>) => {
     if (e) {
       e.preventDefault();
       e.stopPropagation();
     }
 
     function remove() {
       deleteFavorites.call(id);
     }
     openModal(<DeleteModal onDelete={remove} onCloseModal={closeModal} />);
   };
 
   const jobs: { secteur: ISecteur; jobs: IJob[] }[] = [];
   forEach(listJobs.data, job => {
     if (job.secteur[0]) {
       const current = jobs.find(secteurJobs => secteurJobs.secteur._id === job.secteur[0]._id);
       if (current) {
         current.jobs.push(job);
       } else {
         jobs.push({ secteur: job.secteur[0], jobs: [job] });
       }
     }
   });
 
   const autres = {
     secteur: {
       _id: 'Autre',
       title: 'Autre',
       activities: null,
       parentId: null,
       search: '',
       type: '',
       resources: {
         backgroundColor: '',
         icon: '',
       },
     },
     jobs: filter(listJobs.data, job => !job.secteur[0]),
   };
 
   const secteurs = jobs.map(job => ({
     ...job.secteur,
     isSelected: !!selectedSecteurs.find(id => id === job.secteur._id),
   }));
   if (autres.jobs.length) {
     secteurs.push({
       ...autres.secteur,
       isSelected: !!selectedSecteurs.find(id => id === autres.secteur._id),
     });
   }
 
   let selectedJobs = jobs;
   console.log(jobsListRef.current);
   if (selectedSecteurs.length) {
     selectedJobs = jobs.filter(job => selectedSecteurs.find(id => job.secteur._id === id));
   }
   const isExistInFav = (id: string) => {
     const test = getFav.data.data.some((item: any) => item.job._id === id);
     return test;
   };
   const handleCard = (id: string, idFav?: string) => {
     openModal(
       <JobModal
         onCloseModal={closeModal}
         confirme={closeModal}
         id={id}
         idFav={idFav}
         parcoursId={parcoursId}
         fetchingParcours={fetchingParcours}
         update={isExistInFav(id)}
         remove={(i, e) => onJobRemove(idFav, e)}
       />,
     );
   };
   const jArray = jobs.map(el => el.jobs.map(al => al)).flat(1);
   const recommandedArray = jArray.filter((j, i) => i < 9);
   const otherArray = jArray.filter((j, i) => i >= 9);
 
   if (!jobsListRef.current.length && !isEmpty(jArray)) jobsListRef.current = recommandedArray;
 
   return (
     <div className={classes.container}>
       {fetching && (
         <div className={`fixed_fill flex_center ${classes.loading_container}`}>
           <Spinner />
         </div>
       )}
       <SideBar secteurs={getSecteurs.data} filterJobs={filterJobs} parcoursId={parcoursId} />
       <div className={classes.jobs_container}>
         <div className={classes.selections}>
           <div className={classes.selection_title} onClick={setSelectionToggle}>
             <img
               src={arrow}
               alt="l"
               className={isSelectionOpen ? classes.arrowRoteted : classes.arrow}
             />
 
             <div>Ma sélection</div>
           </div>
           <div
             className={classNames(
               isSelectionOpen ? classes.filter_containerOpen_child : classes.filter_container_child,
             )}
           >
             {map(getFav.data.data, (item: any) => (
               <JobSelection
                 title={item.job.title}
                 onClick={() => handleCard(item.job._id, item._id)}
                 key={item.job._id}
               >
                 <div
                   onClick={event => onJobRemove(item._id, event)}
                   className={classes.iconsContainer}
                 >
                   <MultiIcon type="remove" width="22" height="22" className={classes.remove} />
                 </div>
               </JobSelection>
             ))}
           </div>
         </div>
         <div className={classes.containerAllCards}>
           <div className={classes.selection_title} onClick={setRecommandedtoggle}>
             <img
               src={arrow}
               alt="l"
               className={isRecommandedOpen ? classes.arrowRoteted : classes.arrow}
             />
             <div>Mon top métier</div>
           </div>
 
           <div
             className={classNames(
               isRecommandedOpen
                 ? classes.filter_containerOpen_child
                 : classes.filter_container_child,
             )}
           >
             {recommandedArray.map((metier, i) => {
               const index = jobsListRef.current.findIndex(job => job._id === metier._id);
 
               let rating: 0 | 1 | 2 | 3 = 0;
               let color = '#696b6d';
               if (i <= 2) {
                 rating = 3;
                 color = '#fab82d';
               } else if (i <= 5) {
                 rating = 2;
                 color = '#c8ccb0';
               } else if (i <= 8) {
                 rating = 1;
                 color = '#a67c52';
               }
               return (
                 <JobCard
                   rating={rating}
                   color={color}
                   jobName={metier.title}
                   jobAccessebility={metier.accessibility}
                   jobDescription={metier.description}
                   jobInterest={metier.interests}
                   onClick={() => handleCard(metier._id)}
                   key={metier._id}
                 />
               );
             })}
           </div>
         </div>
         <div className={classes.containerAllCards}>
           <div className={classes.selection_title} onClick={setOthertoggle}>
             <img
               src={arrow}
               alt="l"
               className={isOtherOpen ? classes.arrowRoteted : classes.arrow}
             />
             <div>Tous les métiers</div>
           </div>
           <div
             className={classNames(
               isOtherOpen ? classes.filter_containerOpen_child : classes.filter_container_child,
             )}
           >
             {otherArray.map(metier => (
               <JobCard
                 rating={0}
                 color="#696b6d"
                 jobName={metier.title}
                 jobAccessebility={metier.accessibility}
                 jobDescription={metier.description}
                 jobInterest={metier.interests}
                 onClick={() => handleCard(metier._id)}
                 key={metier._id}
               />
             ))}
           </div>
         </div>
       </div>
     </div>
   );
 };
 
 const mapStateToProps = ({ parcours }: ReduxState): IMapToProps => ({
   parcoursId: parcours.data._id,
   families: parcours.data.families,
   fetchingParcours: parcours.fetching,
 });
 const mapDispatchToProps = (dispatch: Dispatch<AnyAction>): IDispatchToProps => ({
   openModal: (children, backdropClassName) =>
     dispatch(modalActions.openModal({ children, backdropClassName })),
   closeModal: () => dispatch(modalActions.closeModal()),
 });
 
 export default connect(
   mapStateToProps,
   mapDispatchToProps,
 )(
   withApis({
     getParcours,
     deleteFavorites,
     listJobs: getMyJob,
     getSecteurs,
     addFavorites: createFavorites,
     getFav: getFavorites,
   })(withLayout(JobsContainer)),
 );
 
 