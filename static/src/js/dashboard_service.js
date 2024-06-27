/**@odoo-module**/

import { registry } from "@web/core/registry";
import {reactive} from "@odoo/owl";
export const dashboardService = {
dependencies:['rpc'],
    async start(env,{rpc})
    {
    let dashboard_data=reactive({});
        Object.assign(dashboard_data,await rpc('/service/dashboard_service'))
    setInterval(async ()=>{
    Object.assign(dashboard_data,await rpc('/service/dashboard_service'))
    },5000);
    async function getDashboardData()
    {
         return await rpc('/service/dashboard_service');
    }
    return {dashboard_data,getDashboardData:getDashboardData()}
    },
};
registry.category('services').add("dashboardService",dashboardService)
