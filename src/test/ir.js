import {IR} from '../ir'
import {should as chaiShould} from 'chai';
const shuold = chaiShould();

describe("9z - IR", ()=> {
  describe("class Relationship", ()=> {
   
  });
  
  describe("class IR", ()=> {
    it("should parses", ()=> {
      let ir = new IR("B&");
      ir.pathes[0].appellation.should.eql("兄");
    });
  });
});