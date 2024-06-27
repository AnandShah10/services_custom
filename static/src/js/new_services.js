/**@odoo-module**/

import { registry } from "@web/core/registry";
import { Component,useSubEnv,useState,onWillStart } from "@odoo/owl";
import {Layout} from "@web/search/layout";
import {getDefaultConfig} from "@web/views/view";
import {useService} from "@web/core/utils/hooks";
class OdooNewServices extends Component{
    setup()
    {
        this.display = {
        controlPanel :{'top-right':false,'bottom-right':false},
        }

        useSubEnv({
        config:{
            ...getDefaultConfig(),
            ...this.env.config,
        }
    });
    this.dashboardService = useService('dashboardService');
    this.dashboard_data = useState(this.dashboardService.dashboard_data)
//console.log(this.dashboardService.dashboard_data);
//      onWillStart(async ()=>{
//        this.dashboard_data = await this.dashboardService.getDashboardData;
//        console.log("Dashboard",this.dashboard_data)
//      })

     this.simple_mail = useService('simpleMailService');
    }
    get basicServices()
    {
        const basicService = this.env.services.basicService;
        return basicService;
    }
    openSimpleMail()
    {
        this.simple_mail.open()
    }

}
OdooNewServices.template="services_custom.odooNewServices";
OdooNewServices.components = {Layout};
registry.category("actions").add('odooNewServices',OdooNewServices);