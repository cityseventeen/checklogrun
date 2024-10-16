import {assert, data, errors} from '../commonimport.js'

function getFunction(undefined){
    if(this[data.function_to_return_property_symbol] === undefined)
        throw new errors.main_not_setted();

    const actual_function = this[data.function_to_return_property_symbol];

    return actual_function.bind(null);
}

export default getFunction