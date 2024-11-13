import {expect, FFT, DFT, assert, sinon} from './commonimport_fortest.js'

import {checklogrunSync} from './main.js'


describe('main - behavior with promise - usecase', function (){
    let callback, checklogrun_returned_by_main;
    const value_returned = 1;
    const value_returned2 = 2;
    const value_returned3promise = Promise.resolve(3);
    const value_returned4promise = Promise.resolve(4);

    beforeEach(function(){
        callback={};
        callback.cb1 = sinon.spy();
        callback.cb2 = sinon.spy();
        callback.cb3everreturnpromise = sinon.stub().returns(value_returned3promise);
        callback.cb4returnrealvalue = sinon.stub().returns(value_returned2);

        callback.cb5promise = sinon.stub().resolves(value_returned);
        callback.cb6promise = sinon.stub().resolves(value_returned2);
        callback.cb7cbrorcba = sinon.stub().returnsArg(0);
        callback.cb8promisecbrorcba = sinon.stub().resolvesArg(0);
    });
    afterEach(function(){
        sinon.restore();
    });

    describe(`callback invocation order`, function (){
        it(`cba(callback): callback is async, and is run after cbb`, function (){
            const func_clr = checklogrunSync()
                .main(callback.cb1)
                .cbb(callback.cb2)
                .cba(callback.cb5promise)
                .getFunction();
            func_clr();

            [callback.cb5promise, callback.cb2, callback.cb1].forEach(cb => {
                expect(cb.calledOnce).to.be.true;
            });
            
            expect(callback.cb5promise.calledAfter(callback.cb2)).to.be.true;
        });

        it(`cbb(callback): callback is async, and is run before cba`, function (){
            const func_clr = checklogrunSync()
                .main(callback.cb1)
                .cbb(callback.cb5promise)
                .cba(callback.cb2)
                .getFunction();
            func_clr();

            [callback.cb5promise, callback.cb2, callback.cb1].forEach(cb => {
                expect(cb.calledOnce).to.be.true;
            });
            expect(callback.cb5promise.calledBefore(callback.cb2)).to.be.true;
        });

        it(`cbb(callback): callback is async, and is run before main`, function (){
            const func_clr = checklogrunSync()
                .main(callback.cb1)
                .cbb(callback.cb5promise)
                .cba(callback.cb2)
                .getFunction();
            func_clr();

            [callback.cb5promise, callback.cb2, callback.cb1].forEach(cb => {
                expect(cb.calledOnce).to.be.true;
            });
            expect(callback.cb5promise.calledBefore(callback.cb1)).to.be.true;
        });

        it(`cba(callback): callback is async, and is run after main`, function (){
            const func_clr = checklogrunSync()
                .main(callback.cb1)
                .cbb(callback.cb2)
                .cba(callback.cb5promise)
                .getFunction();
            func_clr();

            [callback.cb5promise, callback.cb2, callback.cb1].forEach(cb => {
                expect(cb.calledOnce).to.be.true;
            });
            expect(callback.cb5promise.calledAfter(callback.cb1)).to.be.true;
        });

        it(`main(callback): callback is async, and is run after cbb and before cba`, function (){
            const func_clr = checklogrunSync()
                .main(callback.cb5promise)
                .cbb(callback.cb1)
                .cba(callback.cb2)
                .getFunction();
            func_clr();

            [callback.cb5promise, callback.cb2, callback.cb1].forEach(cb => {
                expect(cb.calledOnce).to.be.true;
            });
            expect(callback.cb5promise.calledAfter(callback.cb1)).to.be.true;
            expect(callback.cb5promise.calledBefore(callback.cb2)).to.be.true;
        });
    });
    describe(`value returned`, function (){
        it(`main(callback): callback return promise, and callback of cba get its value as promise`, function (){
            const func_clr = checklogrunSync()
                .main(callback.cb5promise)
                .cbb(callback.cb1)
                .cba(callback.cb2)
                .getFunction();
            func_clr();

            [callback.cb5promise, callback.cb2, callback.cb1].forEach(cb => {
                expect(cb.calledOnce).to.be.true;
            });

            let value_returned_by_main = callback.cb5promise.getCall(0).returnValue;
            expect(callback.cb2.calledWith(value_returned_by_main)).to.be.true;   
        });
        context(`cbr(callback): callback does not return a promise (not async) and the value returned by main is promise`, function(){
            beforeEach(function(){
                const func_clr = checklogrunSync()
                    .main(callback.cb5promise)
                    .cbr(callback.cb7cbrorcba)
                    .cbb(callback.cb1)
                    .cba(callback.cb2)
                    .getFunction();
                func_clr(value_returned);

                [callback.cb5promise, callback.cb2, callback.cb1, callback.cb7cbrorcba].forEach(cb => {
                    expect(cb.calledOnce).to.be.true;
                });
            });
            it(`cbr(callback) callback is called after main`, function (){
                expect(callback.cb7cbrorcba.calledAfter(callback.cb5promise)).to.be.true;
            });
            it(`main(callback) callback is called with value in f_clr(value)`, function (){
                expect(callback.cb5promise.calledWith(value_returned)).to.be.true;
            });
            it(`main(callback) callback returns a promise`, function (){
                let value_returned_by_main = callback.cb5promise.getCall(0).returnValue;
                expect(value_returned_by_main).to.be.instanceOf(Promise);
            });
            it(`cbr(callback) is called with value returned by callback in main(callback)`, function (){
                let value_returned_by_main = callback.cb5promise.getCall(0).returnValue;
                
                expect(callback.cb7cbrorcba.calledWith(value_returned_by_main)).to.be.true;
                expect(callback.cb7cbrorcba.getCall(0).returnValue).to.equal(value_returned_by_main);
            });
            it(`cba(callback) is called with value returned by callback in cbr(callback)`, function (){
                let value_returned_by_cbr = callback.cb7cbrorcba.getCall(0).returnValue;
                
                expect(callback.cb2.calledWith(value_returned_by_cbr, value_returned)).to.be.true;
            });
        });
        context(`cbr(callback): callback does not return a promise (not async) and the value returned by main is not a promise`, function(){
            beforeEach(function(){
                const func_clr = checklogrunSync()
                    .main(callback.cb4returnrealvalue)
                    .cbr(callback.cb7cbrorcba)
                    .cbb(callback.cb1)
                    .cba(callback.cb2)
                    .getFunction();
                func_clr(value_returned);

                [callback.cb4returnrealvalue, callback.cb2, callback.cb1, callback.cb7cbrorcba].forEach(cb => {
                    expect(cb.calledOnce).to.be.true;
                });
            });
            it(`cbr(callback) callback is called after main`, function (){
                expect(callback.cb7cbrorcba.calledAfter(callback.cb4returnrealvalue)).to.be.true;
            });
            it(`main(callback) callback is called with value in f_clr(value)`, function (){
                expect(callback.cb4returnrealvalue.calledWith(value_returned)).to.be.true;
            });
            it(`main(callback) callback returns a not a promise`, function (){
                let value_returned_by_main = callback.cb4returnrealvalue.getCall(0).returnValue;
                expect(value_returned_by_main).to.equal(value_returned2);
            });
            it(`cbr(callback) is called with value returned by callback in main(callback)`, function (){
                let value_returned_by_main = callback.cb4returnrealvalue.getCall(0).returnValue;
                
                expect(callback.cb7cbrorcba.calledWith(value_returned_by_main)).to.be.true;
                expect(callback.cb7cbrorcba.getCall(0).returnValue).to.equal(value_returned_by_main);
            });
            it(`cba(callback) is called with value returned by callback in cbr(callback)`, function (){
                let value_returned_by_cbr = callback.cb7cbrorcba.getCall(0).returnValue;
                
                expect(callback.cb2.calledWith(value_returned_by_cbr, value_returned)).to.be.true;
            });
        });
        context(`cbr(callback): callback returned promise and the value returned by main is not a promise`, function(){
            beforeEach(function(){
                const func_clr = checklogrunSync()
                    .main(callback.cb4returnrealvalue)
                    .cbr(callback.cb8promisecbrorcba)
                    .cbb(callback.cb1)
                    .cba(callback.cb2)
                    .getFunction();
                func_clr(value_returned);

                [callback.cb4returnrealvalue, callback.cb2, callback.cb1, callback.cb8promisecbrorcba].forEach(cb => {
                    expect(cb.calledOnce).to.be.true;
                });
            });
            it(`cbr(callback) callback is called after main`, function (){
                expect(callback.cb8promisecbrorcba.calledAfter(callback.cb4returnrealvalue)).to.be.true;
            });
            it(`main(callback) callback is called with value in f_clr(value)`, function (){
                expect(callback.cb4returnrealvalue.calledWith(value_returned)).to.be.true;
            });
            it(`main(callback) callback returns not a promise`, function (){
                let value_returned_by_main = callback.cb4returnrealvalue.getCall(0).returnValue;
                expect(value_returned_by_main).to.equal(value_returned2);
            });
            it(`cbr(callback) is called with value returned by callback in main(callback)`, function (){
                let value_returned_by_main = callback.cb4returnrealvalue.getCall(0).returnValue;
                
                expect(callback.cb8promisecbrorcba.calledWith(value_returned_by_main)).to.be.true;
                expect(callback.cb8promisecbrorcba.getCall(0).returnValue).to.be.instanceOf(Promise);
            });
            it(`cba(callback) is called with value returned by callback in cbr(callback)`, function (){
                let value_returned_by_cbr = callback.cb8promisecbrorcba.getCall(0).returnValue;
                
                expect(callback.cb2.calledWith(value_returned_by_cbr, value_returned)).to.be.true;
            });
        });
        context(`cbr(callback): callback returns a promise and the value returned by main is a promise`, function(){
            beforeEach(function(){
                const func_clr = checklogrunSync()
                    .main(callback.cb5promise)
                    .cbr(callback.cb8promisecbrorcba)
                    .cbb(callback.cb1)
                    .cba(callback.cb2)
                    .getFunction();
                func_clr(value_returned);

                [callback.cb5promise, callback.cb2, callback.cb1, callback.cb8promisecbrorcba].forEach(cb => {
                    expect(cb.calledOnce).to.be.true;
                });
            });
            it(`cbr(callback) callback is called after main`, function (){
                expect(callback.cb8promisecbrorcba.calledAfter(callback.cb5promise)).to.be.true;
            });
            it(`main(callback) callback is called with value in f_clr(value)`, function (){
                expect(callback.cb5promise.calledWith(value_returned)).to.be.true;
            });
            it(`main(callback) callback returns a promise`, function (){
                let value_returned_by_main = callback.cb5promise.getCall(0).returnValue;
                expect(value_returned_by_main).to.be.instanceOf(Promise);
            });
            it(`cbr(callback) is called with value returned by callback in main(callback)`, function (){
                let value_returned_by_main = callback.cb5promise.getCall(0).returnValue;
                
                expect(callback.cb8promisecbrorcba.calledWith(value_returned_by_main)).to.be.true;
                expect(callback.cb8promisecbrorcba.getCall(0).returnValue).to.be.instanceOf(Promise);
            });
            it(`cba(callback) is called with value returned by callback in cbr(callback)`, function (){
                let value_returned_by_cbr = callback.cb8promisecbrorcba.getCall(0).returnValue;
                
                expect(callback.cb2.calledWith(value_returned_by_cbr, value_returned)).to.be.true;
            });
        });
    });
});