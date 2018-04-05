/* src/components/HomeContainer.jsx */
/* @flow */

import React from 'react';

class Box extends React.Component {
  constructor(props){
    super(props);
    this.selectBox = this.selectBox.bind(this);
  }

  selectBox() {
    this.props.selectBox(this.props.row, this.props.col);
  }

  render() {
    return (
      <div
        className={this.props.boxClass}
        id={this.props.id}
        onClick={this.selectBox}
      />
    );
  }
}

class Grid extends React.Component <{}> {
  constructor(props: {}) {
    super(props);
    this.state = {
      width: this.props.cols * 14,
      rowsArr: [],
    }
  }
  componentDidMount() {
    this.generateRowsArray();
  }

  generateRowsArray() {
    const {
      rows, cols, gridFull, selectBox,
    } = this.props;
    const rowsArr = [];
    let boxClass = '';

    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        const boxId = `${i}_${j}`;
        boxClass = gridFull[i][j] ? 'box on' : 'box off';
        rowsArr.push(<Box
          boxClass={boxClass}
          key={boxId}
          boxId={boxId}
          row={i}
          col={j}
          selectBox={selectBox}
        />);
      }
    }
    this.setState({ rowsArr });
  }

  render() {
    const { width } = this.state;
    return (
      <div className="grid" style={{ width }}>
        {this.state.rowsArr}
      </div>
    );
  }
}

class HomeContainer extends React.Component <{}> {
  constructor(props: {}) {
    super(props);
    this.speed = 100;
    this.rows = 30;
    this.cols = 50;

    this.state = {
      generation: 0,
      gridFull: Array(this.rows).fill().map(() => Array(this.cols).fill(false)),
    };
  }

  componentDidMount() {
    this.loadInitialData();
  }

  loadInitialData() {
    const promises = [];
    promises.push(this.props.loadInitialData());
    Promise.all(promises).then((data) => {
      this.setState(data[0]);
    }).catch(err => console.log('Error loading data in HomeContainer', err));
  }

  selectBox() {
    console.log('Box selected');
  }

  render() {
    const { title } = this.state || this.props;
    return (
      <div className="text-center">
        <h1 id="site-title" className="rounded">{title}</h1>
        <Grid
          gridFull={this.state.gridFull}
          rows={this.rows}
          cols={this.cols}
          selectBox={this.selectBox}
        />
      </div>
    );
  }
}
export default HomeContainer;
