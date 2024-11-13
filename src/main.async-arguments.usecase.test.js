import {expect, FFT, DFT, assert, sinon} from './commonimport_fortest.js'

import checklogrun from './main.js'


describe('main - behavior with async function - usecase', function (){
    let callback, pipe_endfunction_run;
    const value_returned = 1;
    const value_returned2 = 2;
    const value_returned4 = 4; 
    const value_in_f_clr = 15;

    beforeEach(function(){
        pipe_endfunction_run = [];
        callback={};
        ((name) => {callback[name] = sinon.spy(FFT.prepareAsyncFunction(name, pipe_endfunction_run, value_returned))})('cb1');
        ((name) => {callback[name] = sinon.spy(FFT.prepareAsyncFunction(name, pipe_endfunction_run, value_returned2))})('cb2');
        ((name) => {callback[name] = sinon.spy(FFT.prepareAsyncFunction(name, pipe_endfunction_run))})('cb3');
        callback.cb4 = sinon.stub().returns(value_returned4);
        callback.cb5 = sinon.stub().returnsArg(0);
    });
    afterEach(function(){
        sinon.restore();
    });

    describe(`value returned`,  async function (){
        it(`main(callback): callback is async, and callback of cba get the resolved value of the promise that is the same of value returned by main`, async function (){
            const func_clr = checklogrun()
                .main(callback.cb1)
                .cbb(callback.cb2)
                .cba(callback.cb3)
                .getFunction();
            await func_clr();

            [callback.cb1, callback.cb2, callback.cb3].forEach(cb => {
                expect(cb.calledOnce).to.be.true;
            });

            let value_returned_by_main = callback.cb1.getCall(0).returnValue;
            expect(callback.cb3.calledWithExactly(value_returned_by_main)).to.be.false;
            expect(callback.cb3.calledWithExactly(value_returned)).to.be.true;
        
        });
        context(`cbr(callback): callback is sync and main is async`, function(){
            beforeEach(async function(){
                const func_clr = checklogrun()
                    .main(callback.cb1)
                    .cbr(callback.cb4)
                    .cbb(callback.cb2)
                    .cba(callback.cb3)
                    .getFunction();
                await func_clr(value_in_f_clr);

                [callback.cb1, callback.cb2, callback.cb3, callback.cb4].forEach(cb => {
                    expect(cb.calledOnce).to.be.true;
                });
            });
            it(`cbr(callback) callback is called after main`, async function (){
                expect(callback.cb4.calledAfter(callback.cb1)).to.be.true;
            });
            it(`main(callback) callback is called with value in f_clr(value)`, function (){
                expect(callback.cb1.calledWithExactly(value_in_f_clr)).to.be.true;
            });
            it(`main(callback) callback returns a promise`, function (){
                let value_returned_by_main = callback.cb1.getCall(0).returnValue;
                expect(value_returned_by_main).to.be.instanceOf(Promise);
            });
            it(`cbr(callback) is called with value returned by callback in main(callback) resolved and not promise`, function (){
                expect(callback.cb4.calledWithExactly(value_returned, value_in_f_clr)).to.be.true;
            });
            it(`cba(callback) is called with value returned by callback in cbr(callback) resolved and not promise`, function (){
                expect(callback.cb3.calledWithExactly(value_returned4, value_in_f_clr)).to.be.true;
            });
        });
        context(`cbr(callback): callback of cbr is sync and callback of main is sync`, function(){
            beforeEach(async function(){
                const func_clr = checklogrun()
                    .main(callback.cb4)
                    .cbr(callback.cb5)
                    .cbb(callback.cb1)
                    .cba(callback.cb2)
                    .getFunction();
                await func_clr(value_in_f_clr);

                [callback.cb1, callback.cb2, callback.cb2, callback.cb4, callback.cb5].forEach(cb => {
                    expect(cb.calledOnce).to.be.true;
                });
            });
            it(`cbr(callback) callback is called after main`, function (){
                expect(callback.cb5.calledAfter(callback.cb4)).to.be.true;
            });
            it(`main(callback) callback is called with value in f_clr(value)`, function (){
                expect(callback.cb4.calledWithExactly(value_in_f_clr)).to.be.true;
            });
            it(`main(callback) callback returns not a promise`, function (){
                let value_returned_by_main = callback.cb4.getCall(0).returnValue;
                expect(value_returned_by_main).to.equal(value_returned4);
                expect(value_returned_by_main).is.not.instanceOf(Promise);
            });
            it(`cbr(callback) is called with value returned by callback in main(callback) resolved and not promise`, function (){
                let value_returned_by_main = callback.cb4.getCall(0).returnValue;
                
                expect(callback.cb5.calledWithExactly(value_returned_by_main, value_in_f_clr)).to.be.true;
            });
            it(`cba(callback) is called with value returned by callback in cbr(callback) resolved and not promise`, function (){
                expect(callback.cb2.calledWithExactly(value_returned4, value_in_f_clr)).to.be.true;
            });
        });
        context(`cbr(callback): callback is async and main is sync`, function(){
            beforeEach(async function(){
                const func_clr = checklogrun()
                    .main(callback.cb4)
                    .cbr(callback.cb1)
                    .cbb(callback.cb2)
                    .cba(callback.cb3)
                    .getFunction();
                await func_clr(value_in_f_clr);

                [callback.cb1, callback.cb2, callback.cb3, callback.cb4].forEach(cb => {
                    expect(cb.calledOnce).to.be.true;
                });
            });
            it(`cbr(callback) callback is called after main`, function (){
                expect(callback.cb1.calledAfter(callback.cb4)).to.be.true;
            });
            it(`main(callback) callback is called with value in f_clr(value)`, function (){
                expect(callback.cb4.calledWithExactly(value_in_f_clr)).to.be.true;
            });
            it(`cbr(callback) is called with value returned by callback in main(callback) resolved and not promise`, function (){
                expect(callback.cb1.calledWithExactly(value_returned4, value_in_f_clr)).to.be.true;
            });
            it(`cba(callback) is called with value returned by callback in cbr(callback) resolved and not promise`, function (){
                expect(callback.cb3.calledWithExactly(value_returned, value_in_f_clr)).to.be.true;
            });
        });
        context(`cbr(callback): callback is async and main is async`, function(){
            beforeEach(async function(){
                const func_clr = checklogrun()
                    .main(callback.cb1)
                    .cbr(callback.cb2)
                    .cbb(callback.cb3)
                    .cba(callback.cb4)
                    .getFunction();
                await func_clr(value_in_f_clr);

                [callback.cb1, callback.cb2, callback.cb3, callback.cb4].forEach(cb => {
                    expect(cb.calledOnce).to.be.true;
                });
            });
            it(`cbr(callback) callback is called after main`, function (){
                expect(callback.cb2.calledAfter(callback.cb1)).to.be.true;
            });
            it(`main(callback) callback is called with value in f_clr(value)`, function (){
                expect(callback.cb1.calledWithExactly(value_in_f_clr)).to.be.true;
            });
            it(`cbr(callback) is called with value returned by callback in main(callback) resolved and not promise`, function (){
                expect(callback.cb2.calledWithExactly(value_returned, value_in_f_clr)).to.be.true;
            });
            it(`cba(callback) is called with value returned by callback in cbr(callback) resolved and not promise`, function (){
                expect(callback.cb4.calledWithExactly(value_returned2, value_in_f_clr)).to.be.true;
            });
        });
    });
});
