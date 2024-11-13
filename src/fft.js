import {strict as assert} from 'node:assert'

import data from './data.js'

class FFT{
    static wait(ms){
        return new Promise(resolve => {setTimeout(resolve, ms)});
    }
    static prepareAsyncFunction(name, pipe_end_function_run, value_returned){
        assert.ok(typeof name === 'string');
        assert.ok(Array.isArray(pipe_end_function_run));

        const number_of_istructions = 6;
        const msmin = 10, msmax = 80;

        const syncFunction = function(){let syncinstruction1 = 1; let syncinstruction2 = 2;};
        const asyncFunction = async function(){let ms = FFT.random(msmin, msmax); await FFT.wait(ms)};

        const primitive = new Map();

        for(let i=1; i<=number_of_istructions; i++){
            let choosed_randomly_instruction = (()=>{let chose = FFT.random(1,2)-1;
                return {
                            instruction: [syncFunction, asyncFunction][chose],
                            type: ['sync', 'async'][chose]
                }})();
            primitive.set(i+'', choosed_randomly_instruction);
        }

        const asyncFunctionPrepared = async function(){
            for(const [, value] of primitive){
                const {instruction, type} = value;
                if(type === 'sync') instruction();
                else await instruction();
            }

            pipe_end_function_run.push({name});
            return value_returned;
        };
        
        return asyncFunctionPrepared;
    }
    static random(min, max){
        assert(typeof min === 'number' && min >=0);
        assert(typeof max === 'number' && max > min);

        return Math.floor(Math.random()*(max-min+1)+min);
    }
    static checkSequence(list, ...sequences){
        assert.ok(Array.isArray(list));
        let checkok = true;
        list.forEach((el, i) => {
            checkok = chekok && (el.name === sequences[i]);
        });

        return checkok;
    }
}

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
