import {assert, data} from './commonimport.js'
import {default as functionalityOfCheckLog} from './importfunctionality.js'

const prop_function_to_return = 'function_to_return';


function checklogrunMethods(){
    const context_assigned_by_user = this;
    const context_methods = {};
    storeContextAssignedByUser(context_assigned_by_user, data.property_symbol_for_context_assigned_by_user, context_methods);

    

    const name_of_functionality_list = data.functionalities_name();

    name_of_functionality_list.forEach(function(name_functionality){
        let functionality_imported = functionalityOfCheckLog[name_functionality].default;
        context_methods[name_functionality] = functionality_imported.bind(context_methods);
    });
    context_methods[data.function_to_return_property_symbol] = undefined;

    return context_methods;
}

function storeContextAssignedByUser(context_assigned_by_user, property_symbol_for_context_assigned_by_user, context_methods){
    context_methods[property_symbol_for_context_assigned_by_user] = context_assigned_by_user;

    return context_methods;
}


export default checklogrunMethods;
