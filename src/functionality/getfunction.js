import {assert, data, errors} from '../commonimport.js'

function getFunction(undefined){
    if(this[data.function_to_return_property_symbol] === undefined)
        throw new errors.main_not_setted();

    const context_methods = this;
    const context_this_of_user = this[data.property_symbol_for_context_assigned_by_user];

    const actual_function = context_methods[data.function_to_return_property_symbol];

    return function(...args){
        const context_this_by_user_for_returned_function = this;
        return actual_function.apply(context_this_by_user_for_returned_function, args);};
}

export default getFunction