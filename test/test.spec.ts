import 'mocha';
import {expect} from 'chai';
import {add} from '../src/index';

describe('Test index', () => {
  it('Se compruba la suma de 1+7', () => {
    expect(add(1, 7)).to.be.equal(8);
  });
});

