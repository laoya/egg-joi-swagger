'use strict';
const Joi = require('joi');

module.exports = components => {
  return {
    index: {
      path: '/user/group',
      method: 'get',
      summary: '查询用户群列表',
      parameters: {
        query: {
          name: Joi.string().description('群名'),
        },
      },
      responses: {
        200: {
          schema: {
            data: Joi.array().items({
              id: Joi.number().integer().required()
                .description('用户群 ID'),
              name: Joi.string().length(10).required()
                .description('群名'),
              count: Joi.number().integer().required()
                .description('人数'),
            }),
            pagination: components.responses.pagination,
          },
        },
      },
    },
  };
};
