/*@odoo-module*/
import { Component,xml,useState } from "@odoo/owl";
export class SimpleMail extends Component{
    static template = 'services_custom.SimpleMail';
    setup()
    {
    console.log("Simple mail ")
    this.state = useState({
    email_to:'',subject:'',message:'',
    })
    }

}
export class SimpleMailContainer extends Component{
    static components = { SimpleMail};
    static template = xml`<div class="o_simple_mail_manager">
    <t t-if="state.isActive">
    <SimpleMail t-props='state'/>
    </t>
    </div>`
    setup()
    {
        this.state = useState(this.props.simple_mail)
        console.log("Simple mail container props",this.props)
    }
}
