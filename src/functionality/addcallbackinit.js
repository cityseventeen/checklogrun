import {assert, data, errors} from '../commonimport.js'

function addcallbackinit(function_definition){
    assert.ok(typeof function_definition === 'function');

    const context_methods = this;
    const context_this_of_user = this[data.property_symbol_for_context_assigned_by_user];

    if(context_methods[data.function_to_return_property_symbol] === undefined)
        throw new errors.main_not_setted();

    const actual_function = context_methods[data.function_to_return_property_symbol];
    context_methods[data.function_to_return_property_symbol] = function(...args){
        const this_context_by_bind_on_returned_by_getFunction = this;
        function_definition.apply(this_context_by_bind_on_returned_by_getFunction, args);
        let value_to_return = actual_function.apply(this_context_by_bind_on_returned_by_getFunction, args);

        return value_to_return;
    };


    return context_methods;
}

export default addcallbackinit