/* src/components/HomeContainer.jsx */
/* @flow */

import React from 'react';
import Grid from './Grid';

class HomeContainer extends React.Component <{}> {
  constructor(props: {}) {
    super(props);
    this.speed = 100;
    this.rows = 30;
    this.cols = 50;

    this.state = {
      generation: 0,
      // create an array of arrays to represent grid
      grid: Array(this.rows).fill().map(() => Array(this.cols).fill(false)),
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

  // arrow functions style insures correct 'this' is inside it
  selectBox = (row, col) => {
    // create copy of grid array so we can modify it
    let grid = this.state.grid;
    // flip the bool value of the spot in arr that corresponds to box component
    grid[row][col] = !grid[row][col];
    // set grid to our updated grid
    this.setState({
      grid: grid,
    })
  }

  render() {
    const { title } = this.state || this.props;
    return (
      <div className="text-center">
        <h1 id="site-title" className="rounded">{title}</h1>
        <Grid
          gridArray={this.state.grid}
          rows={this.rows}
          cols={this.cols}
          selectBox={this.selectBox}
        />
      </div>
    );
  }
}

export default HomeContainer;
