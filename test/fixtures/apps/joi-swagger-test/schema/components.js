'use strict';

const Joi = require('joi');

const components = {
  schemas: {},
  parameters: {},
  responses: {},
};
const {
  schemas,
} = components;

schemas.user = {
  name: Joi.string().description('用户姓名'),
  age: Joi.number().integer().description('年龄'),
  phone: Joi.string().description('电话'),
};

module.exports = components;
