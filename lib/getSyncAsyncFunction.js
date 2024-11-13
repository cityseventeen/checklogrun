import { assert } from 'console';
import {default as data} from '../src/data.js'


function getSyncAsyncFunction(callbackSync, callbackAsync, to_chose){
    if(to_chose === data.execution_mode.sync)
        return callbackSync;
    else if(to_chose === data.execution_mode.async)
        return callbackAsync;
    else assert('enum must be sync or async');
}


export {getSyncAsyncFunction}
