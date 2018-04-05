/* src/components/Grid.jsx */
/* @flow */

import React from 'react';
import Box from './Box';

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

export default Grid;
