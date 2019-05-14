import React, { useState } from 'react';
import FamileSelected from './FamileSelected';
import PlaceHolderFamile from './PlaceHolderFamile';
import classes from './list.module.scss';
interface IFamile {
  nom: string;
  _id: number;
}
interface Iprops {
  famileSelected: IFamile[];
}
interface IState {
  selected: IFamile[];
}
const arrayMoveMutate = (array: any, from: number, to: number) => {
  array.splice(to < 0 ? array.length + to : to, 0, array.splice(from, 1)[0]);
};
const arrayMove = (array: any, from: number, to: number) => {
  array = array.slice();
  arrayMoveMutate(array, from, to);
  return array;
};
const placeholder = document.createElement('li');
placeholder.className = 'placeholder';
class List extends React.Component<Iprops, IState> {
  state: IState = {
    selected: this.props.famileSelected,
  };

  dragged: any;
  over: any;
  dragStart(e: any) {
    this.dragged = e.currentTarget;
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', this.dragged);
  }
  dragEnd(e: any) {
    this.dragged.style.display = 'block';

    // update state
    const data = this.state.selected;
    const from = Number(this.dragged.dataset.id);
    let to = Number(this.over.dataset.id);
    if (from < to) to--;
    const test = arrayMove(data, from, to);
    this.setState({ selected: test });
  }
  dragOver(e: any) {
    e.preventDefault();
    this.dragged.style.display = 'none';
    this.over = e.target;
  }
  renderPlaceholder = () => {
    const array: JSX.Element[] = [];
    let i = this.props.famileSelected.length;
    for (i; i <= 5; i++) {
      array.push(<PlaceHolderFamile index={i} key={i} />);
    }
    return array;
  }

  render() {
    console.log('draging', this.state.selected);

    const listItems = this.state.selected.map((item, i) => {
      return (
        <div>
          <li
            data-id={i}
            key={i}
            draggable={true}
            onDragEnd={this.dragEnd.bind(this)}
            onDragStart={this.dragStart.bind(this)}
          >
            <FamileSelected famile={item} index={i} />
          </li>
        </div>
      );
    });
    return (
      <div style={{ backgroundColor: '#003189', opacity: 0.8, height: '100vh' }}>
        <ul onDragOver={this.dragOver.bind(this)}>{listItems}</ul>
        {this.renderPlaceholder()}
      </div>
    );
  }
}

export default List;
