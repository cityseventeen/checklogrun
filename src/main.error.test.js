import {expect, FFT, DFT, assert, sinon} from './commonimport_fortest.js'

import checklogrun from './main.js'


describe('main - error', function (){
    context('when main is not called', function(){
        let callback_as_valid_input, checklogrun_applied_to_function;
        beforeEach(function(){
            callback_as_valid_input = sinon.spy();
            checklogrun_applied_to_function = checklogrun();
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




    });
});