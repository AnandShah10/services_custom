/**@odoo-module**/

import { registry } from "@web/core/registry";
import {reactive} from "@odoo/owl";
import {SimpleMailContainer} from "./simple_mail_container"
export const simpleMailService = {
dependencies : ["user","orm",'rpc','notification'],
 async start(env,{orm,user,rpc,notification})
    {
    const user_email = await orm.searchRead('res.partner',[['id','=',user.partnerId]],['email'])
    console.log("user email",user_email)
    let simple_mail=reactive({ isActive:false,open,close,email_from:user_email[0].email,send});
    registry.category('main_components').add('SimpleMailContainer',{
        Component : SimpleMailContainer,
        props: {simple_mail},
    })
    function open()
    {
        simple_mail.isActive=true;
    }
    function close()
    {
        simple_mail.isActive=false;
    }
    async function send(mail)
    {
        const data = {
        email_from:simple_mail.email_from,
        email_to:mail.email_to,
        subject:mail.subject,
        message:mail.message,
        }
        const new_mail = await rpc('/service/simple_mail_service',data);
        if(new_mail){
            notification.add("Email Successfully send",{type:'info'})
        }
        else{
              notification.add("Opps! Something went wrong.Email not send.",{type:'danger'})
        }
        close()
    }
    return {open}
    },
};
registry.category('services').add("simpleMailService",simpleMailService)
