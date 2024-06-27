/**@odoo-module**/

import { registry } from "@web/core/registry";
import {markup} from "@odoo/owl";
export const basicService = {
    start()
    {
    return {
        string:'Basic Service',
        boolean:true,
        integer:1,
        float:0.5,
        array:[1,2,3],
        object:{'key':'value'},
        "function":()=>{
        console.log("Function is called")
        return "Function is called"
        },
        simple_function:function(){
            console.log("Simple Function is called")
            return "Simple Function is called"
        },
        arrow_function:()=>{
        console.log("Arrow Function is called")
        return "Arrow Function is called"
        },
        html: markup("<button class='btn btn-primary' t-on-click='()=>alert(0)'></button>"),
    }
    },
};
registry.category('services').add("basicService",basicService)
