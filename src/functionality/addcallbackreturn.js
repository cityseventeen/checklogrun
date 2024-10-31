import {assert, data, errors} from '../commonimport.js'

function addcallbackreturn(function_definition){
    assert.ok(typeof function_definition === 'function');

    const context_methods = this;
    const context_this_of_user = this[data.property_symbol_for_context_methods_of_clr];

    if(context_methods[data.function_to_return_property_symbol] === undefined)
        throw new errors.main_not_setted();
    if(context_methods[data.value_returned_property] !== undefined)
        console.warn('.cbr may already have been called');

    const actual_function = context_methods[data.function_to_return_property_symbol];
    context_methods[data.function_to_return_property_symbol] = function(...args){
        const this_context_by_bind_on_returned_by_getFunction = this;
        let value_to_return = actual_function.apply(this_context_by_bind_on_returned_by_getFunction, args);
        let value_to_return_modified = function_definition.call(this_context_by_bind_on_returned_by_getFunction, value_to_return, ...args);

        return value_to_return_modified;
    };


    return context_methods;
}

export default addcallbackreturn
