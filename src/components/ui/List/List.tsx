import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import FamileSelected from './FamileSelected';
import classNames from '../../../utils/classNames';
import classes from './list.module.scss';
import ContinueButton from '../../buttons/ContinueButtom/ContinueButton';
import className from '../../../utils/classNames';
import { IFamille } from 'reducers';
interface IProps {
  renderPlaceholder: () => void;
  onSubmit?: () => void;
  onDragEnd: (result: any) => void;
  famileSelected: IFamille[];
  handleDeleteClick: (famille: IFamille) => void;
  disable: number;
  fetching?: boolean;
}

const List = ({
  renderPlaceholder,
  onSubmit,
  onDragEnd,
  famileSelected,
  handleDeleteClick,
  disable,
  fetching,
}: IProps) => (
  <div>
    {famileSelected && (
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {famileSelected.map((item: any, index: number) => {
                return (
                  <Draggable key={item._id} draggableId={`item-${item._id}`} index={index}>
                    {(provided, snapshot) => (
                      <div
                        className={classNames(classes.drag, snapshot.draggingOver && classes.drag_on_drag)}
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <FamileSelected famile={item} index={index} handleDeleteClick={handleDeleteClick} />
                      </div>
                    )}
                  </Draggable>
                );
              })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    )}
    {renderPlaceholder()}
    <div className={classes.btn_container}>
      <ContinueButton
        onClick={onSubmit}
        className={className(classes.btn, disable === 0 && classes.disabled)}
        disabled={disable === 0}
        isFetching={fetching}
        label="VOIR LES METIERS"
      />
    </div>
  </div>
);

export default List;
