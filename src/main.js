import {assert, data} from './commonimport.js'
import {default as functionalityOfCheckLog} from './importfunctionality.js'

const prop_function_to_return = 'function_to_return';


function checklogrunMethods(){
    const name_of_functionality_list = data.functionalities_name();
    const methods_returned_this = this;


   // const methods_returned = {}; to cancel if this works
    name_of_functionality_list.forEach(function(name_functionality){
        let functionality_imported = functionalityOfCheckLog[name_functionality].default;
        methods_returned_this[name_functionality] = functionality_imported.bind(methods_returned_this);
    });
    methods_returned_this[data.function_to_return_property_symbol] = undefined;

    return methods_returned_this;
}



export default checklogrunMethods.bind({})

