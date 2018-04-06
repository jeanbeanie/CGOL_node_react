/* src/components/HomeContainer.jsx */
/* @flow */

import React from 'react';
import Grid from './Grid';

class Buttons extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      speedValue: "fast",
      gridSizeValue: 0,
    }
  }

  handleSpeedChange = (e) => {
    const { value } = e.target;
    this.setState({speedValue: value});
    this.props.changeSpeed(value);
  }

  render() {
    return (
      <div>
        <button className="btn btn-default" onClick={this.props.seed}>
          Seed
        </button>
        <button className="btn btn-default" onClick={this.props.clear}>
          Clear
        </button>
        <button className="btn btn-default" onClick={this.props.play}>
          Play
        </button>
        <button className="btn btn-default" onClick={this.props.pause}>
          Pause
        </button>
        <select value={this.state.speedValue} onChange={this.handleSpeedChange}>
          <option value="slow">Slow</option>
          <option value="fast">Fast</option>
        </select>
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
      // create an array of arrays to represent grid
      grid: Array(this.rows).fill().map(() => Array(this.cols).fill(false)),
    };
  }

  componentDidMount() {
    this.loadInitialData();
  }

  // get initial data/props from config (title, etc)
  loadInitialData() {
    const promises = [];
    promises.push(this.props.loadInitialData());
    Promise.all(promises).then((data) => {
      this.setState(data[0]);
    }).catch(err => console.log('Error loading data in HomeContainer', err));
  }

  // set up interval to run play method
  playButton = () => {
    // start over setInterval for specified intervalId
    if(this.intervalId){
      clearInterval(this.intervalId);
    }
    // every interval of this.speed, call this.play
    this.intervalId = setInterval(this.play, this.speed);
  }

  // run one generation
  play = () => {
    let g = this.state.grid;
    let g2 = this.state.grid;

    // go through every el in grid
    // apply conway's  game of life rules
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        // init how many neighbors a cell has
        let count = 0;
        // check each neighbor of a certain cell
        // add to count if it exists as true
        if (i > 0) if (g[i - 1][j]) count++;
        if (i > 0 && j > 0) if (g[i - 1][j - 1]) count++;
        if (i > 0 && j < this.cols - 1) if (g[i - 1][j + 1]) count++;
        if (j < this.cols - 1) if (g[i][j + 1]) count++;
        if (j > 0) if (g[i][j - 1]) count++;
        if (i < this.rows - 1) if (g[i + 1][j]) count++;
        if (i < this.rows - 1 && j > 0) if (g[i + 1][j - 1]) count++;
        if (i < this.rows - 1 && this.cols - 1) if (g[i + 1][j + 1]) count++;
        // determine if cell should die
        // does cell have <2 or more than 3 neighbors? DIE!
        if (g[i][j] && (count < 2 || count > 3)) g2[i][j] = false;
        // determine if  cell should revive if dead
        // does cell have 3 neighbors? LIVE MY CHILD COMPONENT!
        if (!g[i][j] && count === 3) g2[i][j] = true;
      }
    }
    this.setState({
      gridFull: g2,
      generation: this.state.generation + 1
    });
  }

  // pauses simulation
  pauseButton = () => {
    clearInterval(this.intervalId);
  }

  clearButton = () => {
    const grid = Array(this.rows).fill().map(() => Array(this.cols).fill(false));
    this.setState({
        grid,
        generation: 0,
    });
    this.pauseButton();
  }

  // called when user selects an individual box component
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

  changeSpeed = (speed) => {
    switch (speed) {
    case 'slow':
      this.speed = 1000;
      if (this.state.generation > 0){
        this.playButton();
      }
      break;
    default:
    case 'fast':
      this.speed = 100;
      if (this.state.generation > 0){
        this.playButton();
      }
    }
  }

  // populates the grid with a random amount of active boxes
  seedButton = () => {
    let { grid } = this.state;
    // loop over each value in grid array and inner arrays
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        // 10% chance to set a box's value to 'true'
        if (Math.floor(Math.random() * 10) === 1) {
          grid[i][j] = true;
        }
      }
    }
    // set current grid state to new seeded grid
    this.setState({
      grid: grid,
    })
  }

  render() {
    const { title } = this.state || this.props;
    return (
      <div className="text-center">
        <h1 id="site-title">{title}</h1>
        <h5>Generations: {this.state.generation}</h5>
        <Buttons
          play={this.playButton}
          pause={this.pauseButton}
          changeSpeed= {this.changeSpeed}
          gridSize={this.changeGridSize}
          clear={this.clearButton}
          seed={this.seedButton}
        />
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
