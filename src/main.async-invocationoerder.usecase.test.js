import {expect, FFT, DFT, assert, sinon} from './commonimport_fortest.js'

import checklogrun from './main.js'


describe('main - behavior with async function - usecase', function (){
    let callback, checklogrun_returned_by_main;
    const value_returned = 1;
    const value_returned2 = 2;

    beforeEach(function(){
        callback={};
        callback.cb1async = sinon.spy(FFT.prepareAsyncFunction);
        callback.cb2 = sinon.spy();
        callback.cb3 = sinon.spy();
        callback.cb4 = sinon.stub().returns(value_returned2);
        callback.cb5 = sinon.stub().returnsArg(0);
    });
    afterEach(function(){
        sinon.restore();
    });

    describe(`callback invocation order`, function (){
        it(`cba(callback): callback is async, and is run after cbb`, function (){
            const func_clr = checklogrun()
                .main(callback.cb3)
                .cbb(callback.cb2)
                .cba(callback.cb1async)
                .getFunction();
            func_clr();

            [callback.cb1async, callback.cb2, callback.cb3].forEach(cb => {
                expect(cb.calledOnce).to.be.true;
            });
            
            expect(callback.cb1async.calledAfter(callback.cb2)).to.be.true;
        });

        it(`cbb(callback): callback is async, and is run before cba`, function (){
            const func_clr = checklogrun()
                .main(callback.cb3)
                .cbb(callback.cb1async)
                .cba(callback.cb2)
                .getFunction();
            func_clr();

            [callback.cb1async, callback.cb2, callback.cb3].forEach(cb => {
                expect(cb.calledOnce).to.be.true;
            });
            expect(callback.cb1async.calledBefore(callback.cb2)).to.be.true;
        });

        it(`cbb(callback): callback is async, and is run before main`, function (){
            const func_clr = checklogrun()
                .main(callback.cb3)
                .cbb(callback.cb1async)
                .cba(callback.cb2)
                .getFunction();
            func_clr();

            [callback.cb1async, callback.cb2, callback.cb3].forEach(cb => {
                expect(cb.calledOnce).to.be.true;
            });
            expect(callback.cb1async.calledImmediatelyBefore(callback.cb3)).to.be.true;
        });

        it(`cba(callback): callback is async, and is run after main`, function (){
            const func_clr = checklogrun()
                .main(callback.cb3)
                .cbb(callback.cb2)
                .cba(callback.cb1async)
                .getFunction();
            func_clr();

            [callback.cb1async, callback.cb2, callback.cb3].forEach(cb => {
                expect(cb.calledOnce).to.be.true;
            });
            
            expect(callback.cb1async.calledImmediatelyAfter(callback.cb3)).to.be.true;
        });

        it(`main(callback): callback is async, and is run after cbb and before cba`, function (){
            const func_clr = checklogrun()
                .main(callback.cb1async)
                .cbb(callback.cb2)
                .cba(callback.cb3)
                .getFunction();
            func_clr();

            [callback.cb1async, callback.cb2, callback.cb3].forEach(cb => {
                expect(cb.calledOnce).to.be.true;
            });
            expect(callback.cb1async.calledImmediatelyAfter(callback.cb2)).to.be.true;
            expect(callback.cb1async.calledImmediatelyBefore(callback.cb3)).to.be.true;
        });
    });
});