# -*- coding: utf-8 -*-
{
    'name': 'services_custom',
    'version': '1.0',
    'summary': "service demo",
    'sequence': 10,
    'author': "Anand Shah",
    'description': """
    Just a practice module
""",
    'category': 'Custom/service',
    'depends': ['base', 'web', 'web_editor'],
    'data': [
        'views/templates.xml',
    ],
    'installable': True,
    'application': False,
    'license': 'LGPL-3',
    'assets': {
        'web.assets_backend': ['services_custom/static/src/scss/simple_mail_service.scss',
                               'services_custom/static/src/**/*.js',
                               'services_custom/static/src/**/*.xml', ],
    }
}
