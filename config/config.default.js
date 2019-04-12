'use strict';

/**
 * egg-joi-swagger default config
 * @member Config#joiSwagger
 * @property {String} SOME_KEY - some description
 */
exports.joiSwagger = {
  routePath: '',
  schemaPath: '',
  customLogo: '',
  sampleTheme: '',
  sampleLanguages: {
    shell: 'Shell',
    http: 'HTTP',
    javascript: 'JavaScript',
    'javascript--nodejs': 'Node.js',
    ruby: 'Ruby',
    python: 'Python',
    java: 'Java',
    go: 'Go',
    php: 'PHP',
  },
  servers: [],
  securitySchemes: {},
  security: [],
};
