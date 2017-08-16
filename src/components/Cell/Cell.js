import React from 'react';
import PropTypes from 'prop-types';
import s from './Cell.scss';
import store from '../../store';
import { observer } from 'mobx-react';
import { computed } from 'mobx';

class Cell extends React.Component {

  constructor(){
    super();
    this.state = {
      clicked: false
    }
  }

  componentWillMount() {
    const {rowIndex, cellIndex} = this.props;
    this.state.clicked = computed(() => {
      return store.getCellIndex(rowIndex, cellIndex) === store.selectedCell;
    })
  }

  getClassNames() {
    return this.state.clicked.get() ? s.selected : s.cell;
  }

  render() {
    return (
      <td className={this.getClassNames()} onClick={() => store.setSelectedCell(this.props.rowIndex,this.props.cellIndex)}>{store.getCellData(this.props.rowIndex,this.props.cellIndex)}</td>
    );
  }


}

Cell.propTypes = {
    rowIndex: PropTypes.number.isRequired,
    cellIndex: PropTypes.number.isRequired
};

export default observer(Cell);