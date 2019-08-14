import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import IndexList from 'components_v3/listIndex/indexList';
import classNames from 'utils/classNames';

import { IFamille } from 'reducers';
import FamileSelected from './FamileSelected';
import classes from './list.module.scss';

interface IProps {
  renderPlaceholder: () => void;
  onDragEnd: (result: any) => void;
  famileSelected: IFamille[];
  handleDeleteClick: (id: number) => void;
  disable: number;
  fetching?: boolean;
  fetchingFamille?: boolean;

  renderAllPlaceholder: () => void;
}

const List = ({
  renderPlaceholder,
  renderAllPlaceholder,
  onDragEnd,
  famileSelected,
  handleDeleteClick,
  fetchingFamille,
}: IProps) => (
  <div style={{ width: '100%' }}>
    <div className={classes.containerText}>
      <span className={classNames(classes.text_selection, fetchingFamille && classes.textStyle)}>
        MA SELECTION
      </span>
    </div>

    {famileSelected && (
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {famileSelected.map((item: any, index: number) => (
                <Draggable key={item._id} draggableId={`item-${item._id}`} index={index}>
                  {(provided, snapshot) => (
                    <div
                      className={classNames(
                        classes.drag,
                        snapshot.draggingOver && classes.drag_on_drag,
                      )}
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <div style={{ display: 'flex', width: '100%' }}>
                        <IndexList index={index + 1} isLast={5} />
                        <FamileSelected
                          famile={item}
                          index={index}
                          handleDeleteClick={() => handleDeleteClick(index)}
                        />
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    )}
    {!fetchingFamille && renderPlaceholder()}
    {fetchingFamille && renderAllPlaceholder()}
  </div>
);

export default List;
