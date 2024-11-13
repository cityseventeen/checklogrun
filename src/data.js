import Enum from 'enum'

const data = {
    functionality_list: new Enum({
        'main': 'savemain.js',
        'cbb' : 'addcallbackinit.js',
        'cba': 'addcallbackfin.js',
        'cbr': 'addcallbackreturn.js',
        'getFunction': 'getfunction.js'}, {freeze: true, ignoreCase: true, name: 'functionality_list'}),
    functionalities_name: function(){
        let list = [];
        this.functionality_list.enums.forEach(enum_f => {list.push(enum_f.key)});
        return list;
    },
    get functionality_name(){
        const list_name = {};
        this.functionality_list.enums.forEach(enum_f => {list_name[enum_f.key] = enum_f.key});
        return list_name;
    },
    function_to_return_property_symbol: Symbol(),
    value_returned_property: Symbol(),
    property_symbol_for_context_assigned_by_user: Symbol(),
    property_symbol_for_sync_async_choosed: Symbol(),
    execution_mode: new Enum(['sync', 'async']) 
};

export default data;
