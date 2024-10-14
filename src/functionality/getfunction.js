import {assert, data, errors} from '../commonimport.js'

function getFunction(undefined){
    if(this[data.function_to_return_property_symbol] === undefined)
        throw new errors.main_not_setted();

    const function_thatincludes_checklog = this[data.function_to_return_property_symbol];

    return function_thatincludes_checklog.bind(null);
}

export default getFunction