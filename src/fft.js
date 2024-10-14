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
    static get valid_input_for_checklogrun(){return undefined;}
    static get valid_input_for_methods_of_checklogrun(){return ()=>{};}
    static get all_methods_that_return_object(){
        const method_to_exclude = data.functionality_list.getFunction;
        const list_functionality_from_enums = data.functionality_list.enums;
        const filtered_methods = list_functionality_from_enums
            .filter(enum_value => {return enum_value !== method_to_exclude});
        
        const only_name_of_methods = ((list)=>{
            return list.map(enum_value => {return enum_value.key})
        })(filtered_methods);

        return only_name_of_methods;
    }
}


export {FFT, DFT}