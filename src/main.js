import {assert, data} from './commonimport.js'
import {default as functionalityOfCheckLog} from './importfunctionality.js'

function checklogrunMethodsBuilder(execution_mode){
    const context_assigned_by_user = this;
    const context_methods = {};
    
    storeExecutionMode(context_methods, execution_mode);
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

function storeExecutionMode(context_methods, execution_mode){
    context_methods[data.property_symbol_for_sync_async_choosed] = execution_mode;
}

function checklogrunMethodsSync(){
    const execution_mode = data.execution_mode.sync;
    const context_assigned_by_user = this;
    return checklogrunMethodsBuilder.call(context_assigned_by_user, execution_mode);
}

function checklogrunMethodsAsync(){
    const execution_mode = data.execution_mode.async;
    const context_assigned_by_user = this;
    return checklogrunMethodsBuilder.call(context_assigned_by_user, execution_mode);
}




export default checklogrunMethodsSync;
export {checklogrunMethodsSync, checklogrunMethodsAsync as checklogrunMethods};

