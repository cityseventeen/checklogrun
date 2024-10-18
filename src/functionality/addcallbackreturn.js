import {assert, data, errors} from '../commonimport.js'

function addcallbackreturn(function_definition){
    assert.ok(typeof function_definition === 'function');

    if(this[data.function_to_return_property_symbol] === undefined)
        throw new errors.main_not_setted();
    if(this[data.value_returned_property] !== undefined)
        console.warn('.cbr may already have been called');

    const actual_function = this[data.function_to_return_property_symbol];
    this[data.function_to_return_property_symbol] = function(...args){
        let value_to_return = actual_function.apply(null, args);
        let value_to_return_modified = function_definition.call(null, value_to_return, ...args);

        return value_to_return_modified;
    };


    return this;
}

export default addcallbackreturn
