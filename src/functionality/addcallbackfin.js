import {assert, data, errors} from '../commonimport.js'

function addcallbackfin(function_definition){
    assert.ok(typeof function_definition === 'function');

    if(this[data.function_to_return_property_symbol] === undefined)
        throw new errors.main_not_setted();

    const actual_function = this[data.function_to_return_property_symbol];
    this[data.function_to_return_property_symbol] = function(...args){
        let value_to_return = actual_function.call(null, args);
        function_definition.apply(null, value_to_return, ...args);

        return value_to_return;
    };


    return this;
}

export default addcallbackfin