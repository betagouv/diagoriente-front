import React, { Component } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import PlaceHolderFamile from './PlaceHolderFamile';
import FamileSelected from './FamileSelected';
import classNames from '../../../utils/classNames';
import classes from './list.module.scss';

// fake data generator
const getItems = (count: number) =>
  Array.from({ length: count }, (v, k) => k).map(k => ({
    id: `item-${k}`,
    content: `item ${k}`,
  }));

// a little function to help us with reordering the result
const reorder = (list: any, startIndex: any, endIndex: any) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

class App extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      items: this.props.famileSelected,
    };
    this.onDragEnd = this.onDragEnd.bind(this);
  }

  onDragEnd(result: any) {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const items = reorder(this.state.items, result.source.index, result.destination.index);

    this.setState({
      items,
    });
  }

  renderPlaceholder = () => {
    const array: JSX.Element[] = [];
    for (let i = this.props.famileSelected.length + 1; i <= 5; i += 1) {
      array.push(<PlaceHolderFamile index={i} key={i} />);
    }
    return array;
  }
  render() {
    console.log(this.state.items);

    return (
      <div>
        {this.state.items && (
          <DragDropContext onDragEnd={this.onDragEnd}>
            <Droppable droppableId="droppable">
              {(provided, snapshot) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  {this.state.items.map((item: any, index: number) => (
                    <Draggable key={item._id} draggableId={`item-${item.id}`} index={index}>
                      {(provided, snapshot) => (
                        <div
                          className={classNames(classes.drag, snapshot.draggingOver && classes.drag_on_drag)}
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <FamileSelected famile={item} index={index} />
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
        {this.renderPlaceholder()}
      </div>
    );
  }
}

export default App;
