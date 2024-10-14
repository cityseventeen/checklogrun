import {expect, FFT, DFT} from './commonimport_fortest.js'

import functionalities_imported from './importfunctionality.js'

describe('main - how is made', function (){
    it('functionalities_imported is an object', function (){
        expect(functionalities_imported).to.be.an('object');
    });
    DFT.methods_list.forEach(method_name => {
        it(`functionalities_imported includes ${method_name} method that is a function`, function (){
            expect(functionalities_imported[method_name].default).to.be.a('function');
        });
    });
});