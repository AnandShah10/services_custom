from odoo import http

class Controller(http.Controller):
    @http.route('/service/practice',type='json',auth='user')
    def get_rpc(self,limit=100):
        result = http.request.env['res.partner'].search_read([],['name','email'],limit=limit)
        return result

    @http.route('/service/dashboard_service', type='json',auth='user')
    def get_dashboard_data(self):
        partner = http.request.env['res.partner']
        result ={
            'partners':partner.search_count([]),
            'customers':partner.search_count([('is_company','=',True)]),
            'individuals':partner.search_count([('is_company','=',False)]),
            'locations':len(partner.read_group([],['state_id'],['state_id'])),
        }
        return result