'use strict';

const Joi = require('joi');

const components = {
  schemas: {},
  parameters: {},
  responses: {},
};
const {
  parameters,
  responses,
} = components;

parameters.pagination = {
  pagination: Joi.number().integer().valid(0, 1)
    .optional()
    .description('use pages'),
  page: Joi.number().integer()
    .when('pagination', {
      is: 1,
      then: Joi.default(1).required(),
      otherwise: Joi.optional(),
    })
    .description('current page index'),
  size: Joi.number().integer()
    .when('pagination', {
      is: 1,
      then: Joi.default(15).required(),
      otherwise: Joi.optional(),
    })
    .description('page size'),
};

responses.pagination = Joi.object({
  page: Joi.number().integer().default(1)
    .description('current page index'),
  size: Joi.number().integer().default(15)
    .description('page size'),
  row_count: Joi.number().integer().description('total row size'),
  page_count: Joi.number().integer().description('total page size'),
}).description('pagination schema');

responses.notFound = Joi.object({}).description('The specified resource was not fount');

responses.genericError = Joi.object({
  message: Joi.string().required().description('error message'),
}).description('error message schema');

module.exports = components;
