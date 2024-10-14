import {assert, data, errors} from '../commonimport.js'

function addcallbackfin(function_definition){
    assert.ok(typeof function_definition === 'function');

    if(this[data.function_to_return_property_symbol] === undefined)
        throw new errors.main_not_setted();

    const actual_function = this[data.function_to_return_property_symbol];
    this[data.function_to_return_property_symbol] = function(...args){
        [actual_function, function_definition].forEach(f =>{f.call(null, args)});
    };


    return this;
}

export default addcallbackfin