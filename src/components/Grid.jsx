/* src/components/Grid.jsx */
/* @flow */

import React from 'react';
import Box from './Box';

class Grid extends React.Component <{}> {
  constructor(props: {}) {
    super(props);
  }

  render() {
    const {
      rows, cols, gridArray, selectBox,
    } = this.props;
    const rowsArr = [];
    let boxClass = '';

    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        const boxId = `${i}_${j}`;
        boxClass = gridArray[i][j] ? 'box on' : 'box off';
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
    const width = cols * 14;
    return (
      <div className="grid" style={{ width }}>
        {rowsArr}
      </div>
    );
  }
}

export default Grid;
