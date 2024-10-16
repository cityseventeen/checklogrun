import {assert, data, errors} from '../commonimport.js'

function getFunction(undefined){
    if(this[data.function_to_return_property_symbol] === undefined)
        throw new errors.main_not_setted();

    const function_builded_with_cbr = ((function_to_return, cbr)=>{
        return function(...args){
            const value_returned = function_to_return.call(null, args)

            if(typeof cbr !== undefined){
                cbr.apply(null, value_returned, ...args);
            }
            return value_returned;
        };
    })(this[data.function_to_return_property_symbol], this[data.value_returned_property]);

    return function_builded_with_cbr.bind(null);
}

export default getFunction