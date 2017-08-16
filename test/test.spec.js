/**
 * Created by mirif on 16/08/2017.
 */
import {expect} from 'chai';
import {createStore} from '../src/store';

describe('blas', () => {
  it('should parse data as data', () => {
    const store = createStore({'A1': '6'});
    expect(store.getCellValue('A1')).to.equal(6);
  });

  it('should parse data from cell and value', () => {
    const store = createStore({'A1': '6', 'A2': '=A1 + 3'});
    expect(store.getCellValue('A2')).to.equal(9);
  });

  it('should return empty string for non existing cell', () => {
    const store = createStore();
    expect(store.getCellValue('A2')).to.equal('');
  });
});