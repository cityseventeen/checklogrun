import {expect, FFT, DFT, assert, sinon} from './commonimport_fortest.js'

import {checklogrunSync} from './main.js'


describe('main - error', function (){
    context('when main is not called', function(){
        let callback_as_valid_input, checklogrun_applied_to_function;
        beforeEach(function(){
            callback_as_valid_input = sinon.spy();
            checklogrun_applied_to_function = checklogrunSync();
        });
        afterEach(function(){
            sinon.restore();
        });
        DFT.all_methods_except_for_getFunction_that_require_main_to_be_called_first.forEach(method => {
            it(`${method} method throw error when called without main`, function (){
                expect(()=>{checklogrun_applied_to_function[method](callback_as_valid_input)}).to.throw(ReferenceError);
            });
            it(`getFunction method throw error when called without main`, function (){
                expect(()=>{checklogrun_applied_to_function.getFunction()}).to.throw(ReferenceError);
            });
        });
    });
    context('when main is called', function(){
        describe('calling main', function (){
            it('not valid input for main method throw error', function (){
                DFT.not_valid_input_for_methods.forEach(not_valid_input => {
                    expect(()=>{checklogrunSync().main(not_valid_input)}).to.throw()});
            });
        });
        describe('not valid input for methods except for main', function (){
            let returned_after_main_called;
            let callback_as_valid_input;
            beforeEach(function(){
                callback_as_valid_input = sinon.spy();
                returned_after_main_called = checklogrunSync().main(callback_as_valid_input);
            });
            afterEach(function(){
                sinon.restore();
            })
            DFT.methods_that_require_function_as_valid_input.forEach(method => {
                it(`not valid input for ${method} method throw error`, function (){
                    DFT.not_valid_input_for_methods.forEach(not_valid_input => {
                        expect(()=>{returned_after_main_called[method](not_valid_input)}).to.throw();
                    });
                });

            });
        });
    });
});