import Enum from 'enum'

const data = {
    functionality_list: new Enum({
        'main': 'savemain.js',
        'cbi' : 'addcallbackinit.js',
        'cbf': 'addcallbackfin.js',
        'cbr': 'addcallbackreturned.js',
        'getFunction': 'getfunction.js'}, {freeze: true, ignoreCase: true, name: 'functionality_list'}),
    functionalities_name: function(){
        let list = [];
        this.functionality_list.enums.forEach(enum_f => {list.push(enum_f.key)});
        return list;
    },
    function_to_return_property_symbol: Symbol(),
    value_returned_property: 'cbr' // ***** dovrebbe essere symbol
};

export default data;
