import {assert, data, errors} from '../commonimport.js'

function addcallbackinit(function_definition){
    assert.ok(typeof function_definition === 'function');

    if(this[data.function_to_return_property_symbol] === undefined)
        throw new errors.main_not_setted();

    const actual_function = this[data.function_to_return_property_symbol];
    this[data.function_to_return_property_symbol] = function(...args){
        function_definition.call(null, args);
        let value_to_return = actual_function.call(null, args);

        return value_to_return;
    };


    return this;
}

export default addcallbackinit