import {expect, FFT, DFT, assert, sinon} from './commonimport_fortest.js'

import checklogrun from './main.js'


describe('main - usecase', function (){
    let callback, checklogrun_applied_to_function;
    beforeEach(function(){
        callback={};
        callback.cb1 = sinon.spy();
        callback.cb2 = sinon.spy();
        callback.cb3 = sinon.spy();
        callback.cb4 = sinon.spy();

        //checklogrun_applied_to_function = checklogrun().
    });
    afterEach(function(){
        sinon.restore();
    });
    it('title', function (){
       // expect(true).to.be.false;
    });
});