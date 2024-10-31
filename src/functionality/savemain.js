import {assert, data} from '../commonimport.js'

function saveMainFunction(function_definition){
    assert.ok(typeof function_definition === 'function');

    const context_methods = this;
    const context_this_of_user = this[data.property_symbol_for_context_assigned_by_user];

    if(context_methods[data.function_to_return_property_symbol] !== undefined)
        console.warn('.main may already have been called');

    context_methods[data.function_to_return_property_symbol] = function_definition; // non c'è bisogno di  .bind(this_context) perché verrà dato il contesto al main sicuramente o dalle varie cbb cba cbr o alla getFunction stessa

    return context_methods;
}

export default saveMainFunction