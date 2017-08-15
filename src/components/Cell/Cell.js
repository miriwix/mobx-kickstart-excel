import React from 'react';
import PropTypes from 'prop-types';
import s from './Cell.scss';
import store from '../../store';
import { observer } from 'mobx-react';

function Cell({rowIndex, cellIndex}) {
  return (
      <td className={s.cell} onClick={() => store.setSelectedCell(rowIndex,cellIndex)}>{store.getCellData(rowIndex,cellIndex)}</td>
  );
}

Cell.propTypes = {
    rowIndex: PropTypes.number.isRequired,
    cellIndex: PropTypes.number.isRequired
};

export default observer(Cell);