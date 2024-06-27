/**@odoo-module**/

import { registry } from "@web/core/registry";
import { Component,useSubEnv,useState } from "@odoo/owl";
import {Layout} from "@web/search/layout";
import {getDefaultConfig} from "@web/views/view";
import {useService} from "@web/core/utils/hooks";
import {cookie} from "@web/core/browser/cookie";
import { browser } from "@web/core/browser/browser";
import { routeToUrl } from "@web/core/browser/router_service";
import {ConfirmationDialog} from "@web/core/confirmation_dialog/confirmation_dialog";
class OdooServices extends Component{
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
     const titleService = useService('title');
        titleService.setParts({zopenerp:'Caret',name:'anand',type:'service'})
        console.log(titleService.getParts())
    if(cookie.get('dark_theme') == undefined)
    {
        cookie.set('dark_theme',false);
    }
    this.state = useState({
    dark_theme : cookie.get('dark_theme'),
    http_data : [],
    post_data:[],
    rpc_data:[],
    orm_data:[],
    debug : this.env.services.router.current.search.debug,
    user_data:[],
    company_data:[],
    });
//    this.notification = useService('notification');
    }
    showNotification()
    {
//        console.log("Notification Service",this.notification);
        const notif = this.env.services.notification;
        notif.add("This is service notification",{
        title : "Notification",
        type:"info",
        sticky:true,
        className:'p-4',
        buttons:[
        {
            name:"Ok",
            onClick:()=>{
                console.log("Pressed ok");
                 window.location.reload(true);
           },
            primary:true,
        },
        {
            name:"Cancel",
            onClick:()=>{
                console.log("Pressed cancel");
                },
        }
        ]
        });

    }

     showDialog()
    {
//        console.log("Notification Service",this.notification);
        const dialog = this.env.services.dialog;
        dialog.add(ConfirmationDialog,{
        title:"Dialog",
        body:"Are You sure?",
        confirm:()=>
        {
            console.log("Confirmed");
            this.showNotification();
        },
        cancel:()=>{
            console.log("Canceled");
//            window.location.reload(true);
        },
    },
      {
        onClose:()=>{
            console.log("Dialog Closed");
        }},
    );
    }

    showEffect()
    {
        const effect = this.env.services.effect;
        effect.add({
        type:'rainbow_man',
        message:'Effect service',
        });
    }
    setCookieService()
    {
      if(cookie.get('dark_theme')== 'false')
    {
        cookie.set('dark_theme',true);
    }
    else{
         cookie.set('dark_theme',false);
    }
    this.state.dark_theme = cookie.get("dark_theme");
    //this.cookie.deleteCookie('test');
    }
   async getHttpService()
    {
        const http = this.env.services.http;
        const data = http.get('https://dummyjson.com/products');
        this.state.http_data = data;
    }
     async postHttpService()
    {
        const http = this.env.services.http;
        const data = await http.post('https://dummyjson.com/products',{limit:15});
        this.state.post_data = data;
    }
    async getRPCService()
    {
        const rpc = this.env.services.rpc;
        const data = await rpc('/service/practice');
        this.state.rpc_data = data;
    }
    getORMService()
    {
        const orm = this.env.services.orm;
        const data = orm.searchRead('project.project',[],['display_name','description']);
        this.state.orm_data = data;
    }
    getActionService()
    {
        const action = this.env.services.action;
        action.doAction({
            type:'ir.actions.act_window',
            name:'Action Service',
            res_model:'project.task',
            domain:[],
            context:{},
            views:[[false,'list'],[false,'form']],
            view_mode:'list,form',
            target:'current',
        })
    }
     getRouterService()
    {
        const router = this.env.services.router;
        const {search} = router.current;
        if(search.debug=='1')
        {
            search.debug='0';
        }
        else{
        search.debug ='1';
        }
        this.state.debug=search.debug;
        browser.location.href= browser.location.origin + routeToUrl(router.current)
    }
    getUserService()
    {
        const user = this.env.services.user;
        this.state.user_data=JSON.stringify(user);
    }
    getCompanyService()
    {
        const company = this.env.services.company;
        this.state.company_data=JSON.stringify(company);
    }
}
OdooServices.template="services_custom.odooServices";
OdooServices.components = {Layout};
registry.category("actions").add('odooServices',OdooServices);