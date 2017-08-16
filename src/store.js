/**
 * Created by mirif on 15/08/2017.
 */
import mobx from 'mobx';
import mobxReact from 'mobx-react';

const { observable, action, computed } = mobx;
const { observer } = mobxReact;
const cellRegex = new RegExp('[A-J][1-9][0-9]*', 'g');

export function createStore(initialGrid = {}) {
  return  observable({
    grid: observable.map(initialGrid),
    selectedCell: '',
    getCellIndex(rowIndex, cellIndex) {
      return `${String.fromCharCode(cellIndex + 'A'.charCodeAt(0))}${rowIndex+1}`;
    },
    getCellData(rowIndex, cellIndex) {
      const cellData = this.grid.get(this.getCellIndex(rowIndex,cellIndex));
      if (cellData) return this.getCellValue(this.getCellIndex(rowIndex,cellIndex));
    },
    getCellDataByKey(key){
      return this.grid.get(key);
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
    getCellValue(cell){
      let parsedDataCell = this.grid.get(cell);
      if (!parsedDataCell) {
        return '';
      }
      let cellKeys = parsedDataCell.match(cellRegex) || [];
      cellKeys.forEach(cellKey => {
        const evaledData = this.getCellValue(cellKey);
        parsedDataCell = parsedDataCell.replace(cellKey, evaledData);
      });
      return eval(parsedDataCell.replace(/\=/g, ""));
    },
  });
}

const store = createStore({A1: '1'});

window.store = store;
window.mobx = mobx;
export default store;