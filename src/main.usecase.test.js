import {expect, FFT, DFT, assert, sinon} from './commonimport_fortest.js'

import checklogrun from './main.js'


describe('main - usecase', function (){
    let callback, checklogrun_returned_by_main;
    beforeEach(function(){
        callback={};
        callback.cb1 = sinon.spy();
        callback.cb2 = sinon.spy();
        callback.cb3 = sinon.spy();
        callback.cb4 = sinon.spy();

        checklogrun_returned_by_main = checklogrun().main(callback.cb1);
    });
    afterEach(function(){
        sinon.restore();
    });/*
    context('only main method setted', function(){
        it('function returned by getFunction when called run callback in main(callback) once', function(){
            const applied_checklog = checklogrun_returned_by_main.getFunction();

            applied_checklog();
            expect(callback.cb1.calledOnce).to.be.true;
        });

    });*/
    context('other methods setted', function(){
        DFT.methods_that_require_function_as_valid_input.forEach(method => {
            it(`function returned by getFunction when called run callback in ${method}(callback) once`, function (){
                const applied_checklog = checklogrun_returned_by_main
                    [method](callback.cb3)
                    .getFunction();
                applied_checklog();
                expect(callback.cb1.calledOnce).to.be.true;
                
                expect(callback.cb3.called).to.be.true;
                expect(callback.cb3.calledOnce).to.be.true;
            });

        });


    });
});