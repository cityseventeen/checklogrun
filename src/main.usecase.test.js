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
            it('cbb runs befor main', function (){
                (checklogrun_returned_by_main
                    .cbb(callback.cb2)
                    .getFunction())();    
                expect(callback.cb2.calledImmediatelyBefore(callback.cb1)).to.be.true;
            });
            it('cba runs after main', function (){
                (checklogrun_returned_by_main
                    .cba(callback.cb2)
                    .getFunction())();    
                expect(callback.cb2.calledImmediatelyAfter(callback.cb1)).to.be.true;
            });
            it('order: cbb, main, cba with .cbb .cba', function (){
                (checklogrun_returned_by_main
                    .cbb(callback.cb2)
                    .cba(callback.cb3)
                    .getFunction())();    
                expect(callback.cb2.calledImmediatelyBefore(callback.cb1)).to.be.true;
                expect(callback.cb3.calledImmediatelyAfter(callback.cb1)).to.be.true;
            });
            it('order: cbb, main, cba with .cba .cbb', function (){
                (checklogrun_returned_by_main
                    .cba(callback.cb3)
                    .cbb(callback.cb2)
                    .getFunction())();    
                expect(callback.cb2.calledImmediatelyBefore(callback.cb1)).to.be.true;
                expect(callback.cb3.calledImmediatelyAfter(callback.cb1)).to.be.true;
            });
            it('cbb2 runs before cbb3 befor main with .cbb3 .cbb2', function (){
                (checklogrun_returned_by_main
                    .cbb(callback.cb3)
                    .cbb(callback.cb2)
                    .getFunction())();    
                expect(callback.cb3.calledImmediatelyBefore(callback.cb1)).to.be.true;
                expect(callback.cb2.calledImmediatelyBefore(callback.cb3)).to.be.true;
            });
            it('cba2 runs after cba3 after main with .cba3 .cba2', function (){
                (checklogrun_returned_by_main
                    .cba(callback.cb3)
                    .cba(callback.cb2)
                    .getFunction())();    
                expect(callback.cb3.calledImmediatelyAfter(callback.cb1)).to.be.true;
                expect(callback.cb2.calledImmediatelyAfter(callback.cb3)).to.be.true;
            });
        });
        describe('returned value', function (){
            context(`without cbr setted`, function(){
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
                context('with cba setted', function(){
                    it('return value of main is right', function (){
                        let function_with_checklog = returned_by_main_method
                                                        .cba(callback.cb1)
                                                        .getFunction();
                        expect(function_with_checklog()).to.equal(value_returned);
                    });
                });
                context('with cbb setted', function(){
                    it('return value of main is right', function (){
                        let function_with_checklog = returned_by_main_method
                                                        .cbb(callback.cb1)
                                                        .getFunction();
                        expect(function_with_checklog()).to.equal(value_returned);
                    });
                });
                context('with cba and cbb setted', function(){
                    it('return value of main is right with cba cbb', function (){
                        let function_with_checklog = returned_by_main_method
                                                        .cba(callback.cb1)
                                                        .cbb(callback.cb2)
                                                        .getFunction();
                        expect(function_with_checklog()).to.equal(value_returned);
                    });
                    it('return value of main is right with cbb cba', function (){
                        let function_with_checklog = returned_by_main_method
                                                        .cbb(callback.cb1)
                                                        .cba(callback.cb2)
                                                        .getFunction();
                        expect(function_with_checklog()).to.equal(value_returned);
                    });
                });
            });
            context(`with cbr setted`, function(){
                const value_returned = 'prova valore di ritorno';
                const value_modified = 'valore modificato'
                const cbr_callback = (return_value)=>{return value_modified};
                let returned_by_main_method;
                beforeEach(function(){
                    const function_main = ()=>{return value_returned};
                    returned_by_main_method = checklogrun().main(function_main);
                });
                it(`return value of main is in according to cbr`, function (){
                    const function_with_checklogrun = returned_by_main_method
                                                        .cbr(cbr_callback)
                                                        .getFunction();
                    expect(function_with_checklogrun()).to.equal(value_modified);
                });
                context(`with cba and cbb setted`, function(){
                    it(`return value of main is in according to cbr`, function (){
                        const function_with_checklogrun = returned_by_main_method
                                                        .cba(callback.cb2)
                                                        .cbb(callback.cb3)
                                                        .cba(callback.cb4)
                                                        .cbr(cbr_callback)
                                                        .getFunction();
                        expect(function_with_checklogrun()).to.equal(value_modified);
                    });
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
                context('with cba and cbb setted', function(){
                    DFT.methods_that_require_function_as_valid_input.forEach((method)=>{
                        it(`arguments are read by main with ${method} setted`, function (){
                            const function_with_checklog = returned_by_main_method
                                                            [method](callback.cb2)
                                                            .getFunction();
                            function_with_checklog(1,2,3);
                            expect(callback_main.calledOnceWithExactly(1,2,3)).to.be.true;
                        });
                    });
                    it('arguments are read by main with cba and cbb setted', function (){
                        const function_with_checklog = returned_by_main_method
                                                            .cba(callback.cb2)
                                                            .cbb(callback.cb3)
                                                            .getFunction();
                        function_with_checklog(1,2,3);
                        expect(callback_main.calledOnceWithExactly(1,2,3)).to.be.true;
                    });
                });
            });
            describe('arguments of cbb', function (){
                it('argument of cba are the same of main', function (){
                    const function_with_checklog = returned_by_main_method
                                                            .cbb(callback.cb2)
                                                            .getFunction();
                    function_with_checklog(1,2,3);
                    expect(callback.cb2.calledOnceWithExactly(1,2,3)).to.be.true;
                });
            });
            describe('arguments of cba and cbr', function (){
                [DFT.methods_name.cba, DFT.methods_name.cbr].forEach(method => {
                    it('argument of cba are the same of main plus the returned value', function (){
                        const function_with_checklog = returned_by_main_method
                                                                [method](callback.cb2)
                                                                .getFunction();
                        function_with_checklog(1,2,3);
                        expect(callback.cb2.calledOnceWithExactly(value_returned_by_main, 1,2,3)).to.be.true;
                    });
                });
            });
        });
    });
});