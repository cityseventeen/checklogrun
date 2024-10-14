import {assert, data, errors} from '../commonimport.js'

function callbackForReturned(function_definition){
    assert.ok(typeof function_definition === 'function');

    if(this[data.function_to_return_property_symbol] === undefined)
        throw new errors.main_not_setted();
    if(this[data.value_returned_property] !== undefined)
        console.warn('.cbr may already have been called');

    this[data.value_returned_property] = function_definition;

    return this;
}

export default callbackForReturned