import {expect, FFT, DFT, assert, sinon} from './commonimport_fortest.js'

import checklogrun from './main.js'


describe('main - behavior with async function and promise - use case', function (){
    let callback, pipe_endfunction_run;
    const value_returned = 1;
    const value_returned2 = 2;
    const value_returned4 = 4; 
    const value_in_f_clr = 15;
    const value_promise = Promise.resolve(value_returned)

    beforeEach(function(){
        pipe_endfunction_run = [];
        callback={};
        ((name) => {callback[name] = sinon.spy(FFT.prepareAsyncFunction(name, pipe_endfunction_run, value_promise))})('cb1');
        ((name) => {callback[name] = sinon.spy(FFT.prepareAsyncFunction(name, pipe_endfunction_run, value_promise))})('cb2');
        ((name) => {callback[name] = sinon.spy(FFT.prepareAsyncFunction(name, pipe_endfunction_run))})('cb3');
        callback.cb4 = sinon.stub().returns(value_returned4);
        callback.cb5 = sinon.stub().returnsArg(0);
    });
    afterEach(function(){
        sinon.restore();
    });

    describe(`value returned`,  async function (){
        context(`callbacks main and cbr are async and return promise`, function(){
            it(`cbr receives real value and not promise`, async function (){
                const func_clr = checklogrun()
                    .main(callback.cb1)
                    .cbr(callback.cb2)
                    .cbb(callback.cb3)
                    .cba(callback.cb4)
                    .getFunction();
                await func_clr(value_promise);
    
                [callback.cb1, callback.cb2, callback.cb3, callback.cb4].forEach(cb => {
                    expect(cb.calledOnce).to.be.true;
                });

                expect(callback.cb2.calledWithExactly(value_returned, value_promise));
            });
            it(`cba receives real value and not promise`, async function (){
                const func_clr = checklogrun()
                    .main(callback.cb1)
                    .cbr(callback.cb2)
                    .cbb(callback.cb3)
                    .cba(callback.cb4)
                    .getFunction();
                await func_clr(value_promise);
    
                [callback.cb1, callback.cb2, callback.cb3, callback.cb4].forEach(cb => {
                    expect(cb.calledOnce).to.be.true;
                });

                expect(callback.cb4.calledWithExactly(value_returned, value_promise));
            });
        });
        
    });
});
