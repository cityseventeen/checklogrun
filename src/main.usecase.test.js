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
    });
    context('only main method setted', function(){
        it('function returned by getFunction when called run callback in main(callback) once', function(){
            const applied_checklog = checklogrun_returned_by_main.getFunction();

            applied_checklog();
            expect(callback.cb1.calledOnce).to.be.true;
        });

    });
    context('other methods setted', function(){
        DFT.methods_that_require_function_as_valid_input.forEach(method => {
            it(`function returned by getFunction when called run callback in ${method}(callback) once`, function (){
                const applied_checklog = checklogrun_returned_by_main
                    [method](callback.cb2)
                    .getFunction();
                applied_checklog();
                expect(callback.cb1.calledOnce).to.be.true;

                expect(callback.cb2.called).to.be.true;
                expect(callback.cb2.calledOnce).to.be.true;
            });
        });
        describe('callback called ordered', function (){
            beforeEach(function(){
            });
            it('cbi runs befor main', function (){
                checklogrun_returned_by_main
                //expect(true).to.be.true;
            });
            it('cbf runs after main', function (){
                //expect(true).to.be.false;
            });
            it('order: cbi, main, cbf', function (){
                //expect(true).to.be.false;
            });
            it('cbi2 runs before cbi1 befor main', function (){
                //expect(true).to.be.false;
            });
            it('cbf2 runs after cbf1 after main', function (){
                //expect(true).to.be.false;
            });
        });
        describe('returned value', function (){
            const value_returned = 'prova valore di ritorno';
            let returned_by_main_method;
            beforeEach(function(){
                const function_main = ()=>{return value_returned};
                returned_by_main_method = checklogrun().main(function_main);
            });
            it('return value of main is right', function (){
                let function_with_checklog = returned_by_main_method.getFunction();
                expect(function_with_checklog()).to.equal(value_returned);
            });
            context('with cbi setted', function(){
                it('return value of main is right', function (){
                    let function_with_checklog = returned_by_main_method
                                                    .cbi(callback.cb1)
                                                    .getFunction();
                    expect(function_with_checklog()).to.equal(value_returned);
                });
            });
            context('with cbf setted', function(){
                it('return value of main is right', function (){
                    let function_with_checklog = returned_by_main_method
                                                    .cbf(callback.cb1)
                                                    .getFunction();
                    expect(function_with_checklog()).to.equal(value_returned);
                });
            });
            context('with cbi and cbf setted', function(){
                it('return value of main is right', function (){
                    let function_with_checklog = returned_by_main_method
                                                    .cbi(callback.cb1)
                                                    .cbf(callback.cb2)
                                                    .getFunction();
                    expect(function_with_checklog()).to.equal(value_returned);
                });
            });
        });
        describe('check on arguments', function (){
            it('title', function (){
                //expect(true).to.be.false;// ********
            });
        });


    });
});

// *** test sul fatto che vengano lette le var argomenti dalle callback, e idem che venga letto da cbf il return del main, e che la funzione data da checklogrun restituisca il return del main