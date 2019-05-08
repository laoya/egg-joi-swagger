'use strict';

const Joi = require('joi');
const shins = require('shins');
const assert = require('assert');
const converter = require('widdershins');

const { dejoi } = require('joi2json');
const { isPlainObject } = require('lodash');

let html = '';

module.exports = () => {
  return async function doc(ctx, next) {
    const { app } = ctx;
    const joiSwaggerConfig = app.config.joiSwagger;

    if (ctx.path === joiSwaggerConfig.routePath) {
      if (html) {
        ctx.body = html;
        return;
      }

      const { schema } = app;
      const { components } = schema;
      const { pkg } = app.config;
      const paths = {};
      for (const schemaKey in schema) {
        if (schemaKey === 'components') continue;
        const entity = schema[schemaKey];
        for (const key in entity) {
          const item = Object.assign({}, entity[key]);
          const parameters = [];
          if (item.parameters) {
            let { query, path } = item.parameters;
            if (query) {
              if (isPlainObject(query)) query = Joi.object().keys(query);
              query = dejoi(query);
              for (const name in query.properties) {
                parameters.push({
                  in: 'query',
                  name,
                  // eslint-disable-next-line no-bitwise
                  required: query.required && !!~query.required.indexOf(name),
                  schema: query.properties[name],
                  description: query.properties[name].description,
                });
              }
            }
            if (path) {
              assert(isPlainObject || path.isJoi);
              if (isPlainObject(path)) {
                path = Joi.object().keys(path);
              }
              path = dejoi(path);
              for (const name in path.properties) {
                parameters.push({
                  in: 'path',
                  name,
                  required: true,
                  schema: path.properties[name],
                  description: path.properties[name].description,
                });
              }
            }
          }
          let responses = {};
          if (item.responses) {
            for (const status in item.responses) {
              let resSchema = item.responses[status].schema;
              if (isPlainObject(resSchema)) {
                resSchema = Joi.object(resSchema);
              }
              responses[status] = {
                content: {
                  'application/json': {
                    schema: dejoi(resSchema),
                  },
                },
              };
            }
          } else {
            responses = {
              200: {
                content: {
                  'application/json': {
                    schema: {},
                  },
                },
              },
            };
          }
          item.tags = [ schemaKey ];
          item.operationId = key;
          item.parameters = parameters;
          item.responses = responses;

          if ([ 'put', 'post', 'patch' ].includes(item.method)) {
            let { body, required } = item.requestBody;
            assert(body);

            if (isPlainObject(body)) {
              body = Joi.object().keys(body);
            }

            body = dejoi(body);

            if (required) body.required = required;

            item.requestBody = {
              required: true,
              content: {
                'application/json': {
                  schema: body,
                },
              },
            };
          }

          if (!paths[item.path]) paths[item.path] = {};
          paths[item.path][item.method] = item;
        }
      }

      const swagger = {
        openapi: '3.0.0',
        info: {
          title: pkg.name,
          version: pkg.version,
          description: pkg.description,
        },
        servers: joiSwaggerConfig.servers,
        paths,
        security: joiSwaggerConfig.security || [],
        components: { ...components, securitySchemes: joiSwaggerConfig.securitySchemes },
      };

      const options = {};

      options.codeSamples = true;
      options.httpsnippet = false;
      options.theme = joiSwaggerConfig.sampleTheme ? joiSwaggerConfig.sampleTheme.toLowerCase() : 'darkula';
      options.search = true;
      options.discovery = false;
      options.shallowSchemas = false;
      options.tocSummary = true;
      options.headings = 2;
      options.verbose = false;
      options.omitBody = true;
      options.language_tabs = [];
      options.sample = true;

      Object.getOwnPropertyNames(joiSwaggerConfig.sampleLanguages).forEach(lang => {
        const obj = {};
        obj[lang] = joiSwaggerConfig.sampleLanguages[lang];
        options.language_tabs.push(obj);
      });

      // Shin options
      const shinOptions = {};
      shinOptions.minify = true;
      shinOptions.inline = true;
      shinOptions.unsafe = false;
      shinOptions['no-link'] = true;
      shinOptions.customCss = true;

      // Check for custom logo option
      if (joiSwaggerConfig.customLogo) {
        shinOptions.logo = joiSwaggerConfig.customLogo;
      }

      html = await new Promise((resolve, reject) => {
        converter.convert(swagger, options, (err, markdownString) => {
          if (err) {
            return reject(err);
          }
          shins.render(markdownString, shinOptions, (err, html) => {
            if (err) {
              return reject(err);
            }
            resolve(html);
          });
        });
      });

      ctx.body = html;
    } else {
      await next();
    }
  };
};
