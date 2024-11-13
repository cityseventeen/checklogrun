import {assert, data, errors, getSyncAsyncFunction} from '../commonimport.js'

function addcallbackfin(function_definition){
    assert.ok(typeof function_definition === 'function');
    
    const context_methods = this;
    const context_this_of_user = this[data.property_symbol_for_context_assigned_by_user];

    if(context_methods[data.function_to_return_property_symbol] === undefined)
        throw new errors.main_not_setted();

    const actual_function = context_methods[data.function_to_return_property_symbol];

    const execution_mode = context_methods[data.property_symbol_for_sync_async_choosed];

    context_methods[data.function_to_return_property_symbol] = getSyncAsyncFunction(
        function(...args){
            const this_context_by_bind_on_returned_by_getFunction = this;
            let value_to_return = actual_function.apply(this_context_by_bind_on_returned_by_getFunction, args);
            function_definition.call(this_context_by_bind_on_returned_by_getFunction, value_to_return, ...args);

            return value_to_return;
        },
        async function(...args){
            const this_context_by_bind_on_returned_by_getFunction = this;
            let value_to_return = await actual_function.apply(this_context_by_bind_on_returned_by_getFunction, args);
            await function_definition.call(this_context_by_bind_on_returned_by_getFunction, value_to_return, ...args);

            return value_to_return;
        },
        execution_mode
    );


    return context_methods;
}

export default addcallbackfin