/**
 * Created by mirif on 15/08/2017.
 */
import mobx from 'mobx';
import mobxReact from 'mobx-react';

const { observable, action, computed } = mobx;
const { observer } = mobxReact;

const store = observable({
  grid: observable.map({'A1': '6', 'B2': '1'}),
  selectedCell: '',
  getCellIndex(rowIndex, cellIndex) {
    return `${String.fromCharCode(cellIndex + 'A'.charCodeAt(0))}${rowIndex+1}`;
  },
  getCellData(rowIndex, cellIndex) {
    const cellData = this.grid.get(this.getCellIndex(rowIndex,cellIndex));
    if (cellData) return eval(cellData.replace(/\=/g, ""));
  },
  setCellData: action(function(rowIndex, cellIndex, data) {
    this.grid.set(this.getCellIndex(rowIndex,cellIndex),data);
  }),
  setSelectedCell: action(function(rowIndex, cellIndex) {
    this.selectedCell = this.getCellIndex(rowIndex,cellIndex);
  }),
  setSelectedCellData: action(function (data) {
    this.grid.set(this.selectedCell,data);
  }),
  get selectedCellData() {
    return this.grid.get(this.selectedCell) || '';
  },
  getEvalData: computed(function(cellData) {

  })

});

window.store = store;
export default store;