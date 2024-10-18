// modulo candidato ad essere package autonomo, per permettere facilmente di importare una serie di librerie interne dato nome e percorso
import path from 'node:path'

import {assert, data} from './commonimport.js'


function methodsToImportFromEnum(list_enum, fold){
    let list = [];

    list_enum.enums.forEach(enum_method => {list.push(
        {
            name: enum_method.key,
            path: pathForFileToImport(fold, enum_method.value)
        }
    )});
    return list;
}

function pathForFileToImport(pre, filename){
    assert.ok(typeof pre === 'string');
    assert.ok(typeof filename === 'string' & filename !== "");

    return pre.concat('/',filename);
}

// main
const to_export = await (async ()=>{
    const functionalities_imported = {};
    const functionality_to_import_list = methodsToImportFromEnum(data.functionality_list, './functionality');

    for(let functionality of functionality_to_import_list){
        functionalities_imported[functionality.name] = await import(functionality.path);
    }

    return functionalities_imported;
})();


export default to_export