'use strict';

const Joi = require('joi');
const { isPlainObject } = require('lodash');
const assert = require('assert');

const convertToJoi = obj => {
  assert(
    isPlainObject(obj) ||
    obj.isJoi,
    '[egg-joi-swagger] must be one of Joi and PlainObject'
  );

  let ret;
  if (isPlainObject(obj)) ret = Joi.object(obj);
  if (obj.isJoi) ret = obj;
  return ret;
};

module.exports = {
  validate(action) {
    let result;
    let query = {};
    let requestBody = {};

    if (action.parameters) {
      const parameters = action.parameters;
      if (parameters.query) {
        const querySchema = convertToJoi(parameters.query);
        result = Joi.validate(this.query, querySchema);
        // attempts to cast values to the required types
        if (result.error) this.throw(422, result.error.details[0]);
        query = result.value;
      }

      if (parameters.path) {
        const pathSchema = convertToJoi(parameters.path);

        result = Joi.validate(this.params, pathSchema);
        // attempts to cast values to the required types
        if (result.error) this.throw(422, result.error.details[0]);
        this.params = result.value;
      }
    }

    if (action.requestBody) {
      const payload = action.requestBody;
      const bodySchema = convertToJoi(payload.body);
      result = Joi.validate(this.request.body, bodySchema);
      if (result.error) this.throw(422, result.error.details[0]);
      // attempts to cast values to the required types
      this.request.body = requestBody = result.value;
    }

    return Object.assign(query, requestBody);
  },
  get schema() {
    const { app } = this;
    return app.schema;
  },
};
