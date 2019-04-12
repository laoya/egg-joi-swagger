'use strict';

exports.keys = '123456';

exports.joiSwagger = {
  customLogo: '',
  sampleTheme: '',
  sampleLanguages: {},
  routePath: '/apidoc',
  schemaPath: './schema',
  servers: [{
    url: 'http://localhost/api',
    description: 'local server (uses develop data)',
  }],
  securitySchemes: {
    basicAuth: {
      type: 'http',
      scheme: 'basic',
    },
    cookieAuth: {
      type: 'apiKey',
      in: 'cookie',
      name: 'SSID',
    },
  },
  security: [
    {
      basicAuth: [],
    },
    {
      cookieAuth: [],
    },
  ],
};
