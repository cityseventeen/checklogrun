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
            it('cbi runs befor main', function (){
                (checklogrun_returned_by_main
                    .cbi(callback.cb2)
                    .getFunction())();    
                expect(callback.cb2.calledImmediatelyBefore(callback.cb1)).to.be.true;
            });
            it('cbf runs after main', function (){
                (checklogrun_returned_by_main
                    .cbf(callback.cb2)
                    .getFunction())();    
                expect(callback.cb2.calledImmediatelyAfter(callback.cb1)).to.be.true;
            });
            it('order: cbi, main, cbf with .cbi .cbf', function (){
                (checklogrun_returned_by_main
                    .cbi(callback.cb2)
                    .cbf(callback.cb3)
                    .getFunction())();    
                expect(callback.cb2.calledImmediatelyBefore(callback.cb1)).to.be.true;
                expect(callback.cb3.calledImmediatelyAfter(callback.cb1)).to.be.true;
            });
            it('order: cbi, main, cbf with .cbf .cbi', function (){
                (checklogrun_returned_by_main
                    .cbf(callback.cb3)
                    .cbi(callback.cb2)
                    .getFunction())();    
                expect(callback.cb2.calledImmediatelyBefore(callback.cb1)).to.be.true;
                expect(callback.cb3.calledImmediatelyAfter(callback.cb1)).to.be.true;
            });
            it('cbi2 runs before cbi1 befor main with cbi2 cb3', function (){
                it('order: cbi, main, cbf with .cbi .cbf', function (){
                    (checklogrun_returned_by_main
                        .cbi(callback.cb2)
                        .cbi(callback.cb3)
                        .getFunction())();    
                    expect(callback.cb2.calledImmediatelyBefore(callback.cb1)).to.be.true;
                    expect(callback.cb3.calledImmediatelyBefore(callback.cb2)).to.be.true;
                });
            });
            it('cbf2 runs after cbf1 after main', function (){
                it('order: cbi, main, cbf with .cbi .cbf', function (){
                    (checklogrun_returned_by_main
                        .cbf(callback.cb2)
                        .cbf(callback.cb3)
                        .getFunction())();    
                    expect(callback.cb2.calledImmediatelyAfter(callback.cb1)).to.be.true;
                    expect(callback.cb3.calledImmediatelyAfter(callback.cb2)).to.be.true;
                });
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
                it('return value of main is right with cbi cbf', function (){
                    let function_with_checklog = returned_by_main_method
                                                    .cbi(callback.cb1)
                                                    .cbf(callback.cb2)
                                                    .getFunction();
                    expect(function_with_checklog()).to.equal(value_returned);
                });
                it('return value of main is right with cbf cbi', function (){
                    let function_with_checklog = returned_by_main_method
                                                    .cbf(callback.cb1)
                                                    .cbi(callback.cb2)
                                                    .getFunction();
                    expect(function_with_checklog()).to.equal(value_returned);
                });
            });
        });
        describe('check on arguments', function (){
            let returned_by_main_method;
            const value_returned_by_main = 5;
            let callback_main;
            beforeEach(function(){
                callback_main = sinon.stub().returns(value_returned_by_main);
                returned_by_main_method = checklogrun().main(callback_main);
            });
            afterEach(function(){
                sinon.restore();
            });
            describe('arguments of main', function (){
                it('arguments are read by main', function (){
                    const function_with_checklog = returned_by_main_method.getFunction();
                    function_with_checklog(1,2,3);
                    expect(callback_main.calledOnceWithExactly(1,2,3)).to.be.true;
                });
                context('with cbi and cbf setted', function(){
                    DFT.methods_that_require_function_as_valid_input.forEach((method)=>{
                        it(`arguments are read by main with ${method} setted`, function (){
                            const function_with_checklog = returned_by_main_method
                                                            [method](callback.cb2)
                                                            .getFunction();
                            function_with_checklog(1,2,3);
                            expect(callback_main.calledOnceWithExactly(1,2,3)).to.be.true;
                        });
                    });
                    it('arguments are read by main with cbi and cbf setted', function (){
                        const function_with_checklog = returned_by_main_method
                                                            .cbi(callback.cb2)
                                                            .cbf(callback.cb3)
                                                            .getFunction();
                        function_with_checklog(1,2,3);
                        expect(callback_main.calledOnceWithExactly(1,2,3)).to.be.true;
                    });
                });
            });
            describe('arguments of cbi', function (){
                it('argument of cbi are the same of main', function (){
                    const function_with_checklog = returned_by_main_method
                                                            .cbi(callback.cb2)
                                                            .getFunction();
                    function_with_checklog(1,2,3);
                    expect(callback.cb2.calledOnceWithExactly(1,2,3)).to.be.true;
                });
            });
            describe('arguments of cbf', function (){
                it('argument of cbi are the same of main plus the returned value', function (){
                    const function_with_checklog = returned_by_main_method
                                                            .cbf(callback.cb2)
                                                            .getFunction();
                    function_with_checklog(1,2,3);
                    expect(callback.cb2.calledOnceWithExactly(value_returned_by_main, 1,2,3)).to.be.true;
                });
            });
        });
        describe('check on this', function (){
            describe('reference to method of checklogrun', function (){
                DFT.methods_list.forEach(method => {
                    it(`the function with check log have not ${method} of checklogrun`, function (){
                        let function_with_checklog = checklogrun_returned_by_main.getFunction();
                        expect(new function_with_checklog()).to.not.have.property(method);
                    });
                    context(`when called cbi cbf`, function(){
                        it(`the function with check log have not ${method} of checklogrun`, function (){
                            let function_with_checklog = checklogrun_returned_by_main
                                .cbi(callback.cb2)
                                .cbf(callback.cb3)
                                .getFunction();
                            expect(new function_with_checklog()).to.not.have.property(method);
                        });
                    });
                });
            });
            
        });


    });
});