import {assert, data, errors} from '../commonimport.js'

function addcallbackinit(function_definition){
    assert.ok(typeof function_definition === 'function');

    if(this[data.function_to_return_property_symbol] === undefined)
        throw new errors.main_not_setted();

    const actual_function = this[data.function_to_return_property_symbol];
    this[data.function_to_return_property_symbol] = function(...args){
        [function_definition,actual_function].forEach(f =>{f.call(null, args)});
    };


    return this;
}

export default addcallbackinit