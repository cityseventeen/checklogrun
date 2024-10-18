import {assert, data} from '../commonimport.js'

function saveMainFunction(function_definition){
    assert.ok(typeof function_definition === 'function');

    if(this[data.function_to_return_property_symbol] !== undefined)
        console.warn('.main may already have been called');

    this[data.function_to_return_property_symbol] = function_definition;


    return this;
}

export default saveMainFunction