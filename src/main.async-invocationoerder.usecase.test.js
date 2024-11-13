// fare prima refactoring getFunction in getFunctionSync per gli altri test
// no! deve essere fatto per checklogrunSync perché devo modificare il contesto, e decidere per ogni funzionalità se mettere la funz async o sync

/*import {expect, FFT, DFT, assert, sinon} from './commonimport_fortest.js'

import checklogrun from './main.js'


describe('main - behavior with async function - usecase', function (){
    let callback, checklogrun_returned_by_main;
    const value_returned = 1;
    const value_returned2 = 2;
    let pipe_endfunction_run;

    beforeEach(function(){
        pipe_endfunction_run = [];
        callback={};
        ((name) => {callback[name] = sinon.spy(FFT.prepareAsyncFunction(name, pipe_endfunction_run))})('cb1async');
        callback.cb2 = sinon.spy();
        callback.cb3 = sinon.spy();
        callback.cb4 = sinon.stub().returns(value_returned2);
        callback.cb5 = sinon.stub().returnsArg(0);
    });
    afterEach(function(){
        sinon.restore();
    });
    describe(`returned value by func_clr from getFunctionSync() when a callback is async`, function (){
        const cbasync = async function(){};
        const cbsync = function(){};
        [
            ['cb async for main', checklogrun().main(cbasync).cbb(cbsync).cba(cbsync).getFunctionSync()],
            ['cb async for cbr', checklogrun().main(cbsync).cbr(cbasync).cbb(cbsync).cba(cbsync).getFunctionSync()]
        ].forEach(([where, func_clr]) => {
            it(`value returned by func_clr is a promise when a ${where}`, function (){
                expect(func_clr()).to.be.an.instanceof(Promise);
            });
        });

        [
            ['cb async for cbb', checklogrun().main(cbsync).cbr(cbsync).cbb(cbasync).cba(cbsync).getFunctionSync()],
            ['cb async for cba', checklogrun().main(cbsync).cbr(cbsync).cbb(cbsync).cba(cbasync).getFunctionSync()]
        ].forEach(([where, func_clr]) => {
            it(`value returned by func_clr is not a promise when a ${where}`, function (){
                expect(func_clr()).to.not.be.an.instanceof(Promise);
            });
        });
    });

    describe(`returned value by func_clr from getFunction() (async)`, function (){
        const cbasync = async function(){};
        const cbsync = function(){};
        [
            ['cb async for main', checklogrun().main(cbasync).cbb(cbsync).cba(cbsync).getFunctionSync()],
            ['cb async for cbr', checklogrun().main(cbsync).cbr(cbasync).cbb(cbsync).cba(cbsync).getFunctionSync()]
        ].forEach(([where, func_clr]) => {
            it(`value returned by func_clr is a promise when a ${where}`, function (){
                expect(func_clr()).to.be.an.instanceof(Promise);
            });
        });

        [
            ['cb async for cbb', checklogrun().main(cbsync).cbr(cbsync).cbb(cbasync).cba(cbsync).getFunctionSync()],
            ['cb async for cba', checklogrun().main(cbsync).cbr(cbsync).cbb(cbsync).cba(cbasync).getFunctionSync()]
        ].forEach(([where, func_clr]) => {
            it(`value returned by func_clr is a promise when a ${where}`, function (){
                expect(func_clr()).to.be.an.instanceof(Promise);
            });
        });

        it(`value returned by func_clr is a promise when a each callbacks are sync`, function (){
            const func_clr = checklogrun().main(cbsync).cbr(cbsync).cbb(cbsync).cba(cbsync).getFunction();  
            expect(func_clr()).to.be.an.instanceof(Promise);
        });
    });
    
    describe(`callback invocation order - run after/before => starts and ends after/before`, function (){
        it(`cba(callback): callback is async, and is run after cbb`, async function (){
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
});*/