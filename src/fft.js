import {strict as assert} from 'node:assert'

import data from './data.js'


class FFT{}

class DFT{
    static get methods_list(){
        let list_name = [];
        data.functionality_list.enums.forEach(enum_method => {list_name.push(enum_method.key)});
        assert.ok(list_name.length > 0);
        return list_name;
    }
    static get methods_name(){
        const list_name = {};
        data.functionality_list.enums.forEach(enum_f => {list_name[enum_f.key] = enum_f.key});
        return list_name;
    }
    static get valid_input_for_checklogrun(){return undefined;}
    static get valid_input_for_methods_of_checklogrun(){return ()=>{};}
    static all_methods_except_for(...methods_to_exclude){
        const list_functionality_from_enums = data.functionality_list.enums;
        const filtered_methods = list_functionality_from_enums
            .filter(enum_value => {return !(methods_to_exclude.includes(enum_value))});
        
        const only_name_of_methods = ((list)=>{
            return list.map(enum_value => {return enum_value.key})
        })(filtered_methods);

        return only_name_of_methods;
    }
    static get all_methods_that_return_object(){
        const method_to_exclude = data.functionality_list.getFunction;
        const only_name_of_methods = DFT.all_methods_except_for(method_to_exclude);

        return only_name_of_methods;
    }
    static get all_methods_that_return_object_except_for_main(){
        const method_to_exclude = [data.functionality_list.getFunction, data.functionality_list.main];
        const only_name_of_methods = DFT.all_methods_except_for(...method_to_exclude);

        return only_name_of_methods;
    }
    static get all_methods_except_for_getFunction_that_require_main_to_be_called_first(){
        const methods_that_require_main_to_be_called_first = [
            data.functionality_list.cba,
            data.functionality_list.cbb,
            data.functionality_list.cbr]
            .map(method => {return method.key});
        return methods_that_require_main_to_be_called_first;
    }
    static get not_valid_input_for_methods(){
        return [5, 0, -8, true, false, null, undefined, [], {}];
    }
    static get methods_that_require_function_as_valid_input(){
        return [
            data.functionality_list.cba,
            data.functionality_list.cbb,
            data.functionality_list.cbr]
            .map(method => {return method.key});
    }
}


export {FFT, DFT}
