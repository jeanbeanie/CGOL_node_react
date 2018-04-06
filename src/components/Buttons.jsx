/* src/components/Buttons.jsx */
/* @flow */

import React from 'react';

class Buttons extends React.Component <{}, {}> {
  constructor(props: {}) {
    super(props);
    this.state = {
      speed: 'fast',
      gridSize: 'medium',
    }
  }

  handleSpeedChange = (e) => {
    const { value } = e.target;
    this.setState({speed: value});
    this.props.changeSpeed(value);
  }

  handleGridSizeChange = (e) => {
    const { value } = e.target;
    this.setState({gridSize: value});
    this.props.changeGridSize(value);
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
        <select value={this.state.speed} onChange={this.handleSpeedChange}>
          <option value="slow">Slow</option>
          <option value="fast">Fast</option>
        </select>
        <select value={this.state.gridSize} onChange={this.handleGridSizeChange}>
          <option value="small">Small 20x10</option>
          <option value="medium">Medium 50x30</option>
          <option value="large">Large 70x50</option>
        </select>
      </div>
    );
  }
}

export default Buttons;
