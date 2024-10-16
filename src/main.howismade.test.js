import {expect, FFT, DFT, assert} from './commonimport_fortest.js'

import checklogrun from './main.js'


describe('main - how is made', function (){
    it('checklogrun is a function', function (){
        expect(checklogrun).to.be.a('function');
    });
    describe('checklogrun has all foreseen methods', function (){
        DFT.methods_list.forEach(method_name => {
            it(`checklogrun(valid input) has  ${method_name} method that is a function`, function (){
                expect(checklogrun(DFT.valid_input_for_checklogrun)).has.property(method_name).that.is.a('function');
            });
        });
    });
    describe(`Each method of checklogrun returns an object with each of these methods ${DFT.all_methods_that_return_object_except_for_main}`, function (){
        DFT.all_methods_that_return_object_except_for_main.forEach(method_name => {
            let value_returned_by_checklogrun_calledmain;
            before(function(){
                value_returned_by_checklogrun_calledmain = (function preset_main(callback){
                    assert.isOk(typeof callback === 'function');

                    let value_returned_by_checklogrun = checklogrun(DFT.valid_input_for_checklogrun);
                    return value_returned_by_checklogrun.main(callback);
                })(DFT.valid_input_for_methods_of_checklogrun);
            });
            it(`the ${method_name} method of checklogrun returns object with each of these methods ${DFT.methods_list}`, function (){
                let method_of_checklogrun_to_call = value_returned_by_checklogrun_calledmain[method_name];
                expect(method_of_checklogrun_to_call(DFT.valid_input_for_methods_of_checklogrun)).to.include.all.keys(...DFT.methods_list);
            });
        }); 
    });
    describe('getFunction', function (){
        let checklogrun_presetted_fortest;
        beforeEach(function(){
            checklogrun_presetted_fortest = checklogrun(DFT.valid_input_for_checklogrun)
                .main(DFT.valid_input_for_methods_of_checklogrun);

        });
        context('only .main called', function(){
            it('.getFunction() returns a function', function (){
                expect(checklogrun_presetted_fortest
                    .getFunction()).to.be.a('function');
            });  
        });
        context('also other methods called', function(){
            it('.getFunction() returns a function', function (){
                expect(checklogrun_presetted_fortest
                    .cbi(DFT.valid_input_for_methods_of_checklogrun)
                    .getFunction()).to.be.a('function');
            });

        }); 
    });
});