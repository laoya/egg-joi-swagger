'use strict';

const fs = require('fs');
const Joi = require('joi');
const path = require('path');
const assert = require('assert');
const { dejoi } = require('joi2json');
const { isPlainObject } = require('lodash');

const SCHEMA = Symbol('Application#schema');

module.exports = {
  get schema() {
    if (this[SCHEMA]) {
      return this[SCHEMA];
    }

    const baseDir = this.config.baseDir;
    const joiSwaggerConfig = this.config.joiSwagger;
    assert(baseDir, joiSwaggerConfig.routePath && joiSwaggerConfig.schemaPath);

    const schema = {
      components: {},
    };
    try {
      const defaultComponents = require('../schema/components');
      const schemaDir = path.join(baseDir, joiSwaggerConfig.schemaPath);
      try {
        let userComponents = require(schemaDir + '/components');
        userComponents = isPlainObject(userComponents) ? userComponents : userComponents(defaultComponents);
        // two level components mixed in
        Object.getOwnPropertyNames(userComponents).forEach(componentName => {
          defaultComponents[componentName] = { ...(defaultComponents[componentName] || {}), ...userComponents[componentName] };
        });
      } catch (err) {
        this.coreLogger.info('[egg-joi-swagger] dont have components');
      }
      schema.components = defaultComponents;

      // eslint-disable-next-line no-inner-declarations
      function readFiles(schemaDir, schema) {
        const dirFiles = fs.readdirSync(schemaDir);
        for (let i = 0; i < dirFiles.length; i++) {
          const stat = fs.statSync(schemaDir + '/' + dirFiles[i]);
          if (stat.isDirectory()) {
            schema[dirFiles[i]] = {};
            readFiles(schemaDir + '/' + dirFiles[i], schema[dirFiles[i]]);
          } else {
            const key = dirFiles[i].split('.')[0];
            if (key === 'components') continue;
            schema[key] = require(schemaDir + '/' + dirFiles[i]);
            schema[key] = isPlainObject(schema[key]) ? isPlainObject(schema[key]) : schema[key](schema.components);
          }
        }
      }

      readFiles(schemaDir, schema);

      const { components } = schema;
      for (const paramType in components) {
        for (const key in components[paramType]) {
          if (components[paramType][key].isJoi) {
            components[paramType][key] = dejoi(components[paramType][key]);
          } else if (isPlainObject(components[paramType][key])) {
            components[paramType][key] = dejoi(Joi.object().keys(components[paramType][key]));
          }
        }
      }
    } catch (err) {
      this.coreLogger.error('[egg-joi-swagger] something wrong while read schemas, please check', err);
    }

    this[SCHEMA] = schema;
    return schema;
  },
};
