'use strict';
const Joi = require('joi');

module.exports = components => {
  return {
    index: {
      path: '/user',
      method: 'get',
      summary: '查询用户列表',
      parameters: {
        query: {
          phone: Joi.string().regex(/^\d{4,11}$/, 'phone').description('电话号码'),
        },
      },
      responses: {
        200: {
          schema: {
            data: Joi.array().items({
              id: Joi.number().integer().required()
                .description('用户 ID'),
              name: Joi.string().length(10).required()
                .description('姓名'),
              age: Joi.number().integer().required()
                .description('年龄'),
              phone: Joi.string().regex(/^[0-9]{11}$/, 'phone').required()
                .description('电话号码'),
            }),
            pagination: components.responses.pagination,
          },
        },
      },
    },
    create: {
      path: '/user',
      method: 'post',
      summary: '创建用户',
      requestBody: {
        body: {
          name: Joi.string().required()
            .description('姓名'),
          age: Joi.number().integer().required()
            .description('年龄'),
          phone: Joi.string().regex(/^[0-9]{11}$/, 'phone').required()
            .description('电话号码'),
        },
      },
      responses: {
        200: {
          schema: Joi.object({
            id: Joi.number().integer().required()
              .description('用户 ID'),
            name: Joi.string().length(10).required()
              .description('姓名'),
            age: Joi.number().integer().required()
              .description('年龄'),
            phone: Joi.string().regex(/^[0-9]{11}$/, 'phone').required()
              .description('电话号码'),
          }),
        },
      },
    },
    show: {
      path: '/user/{id}',
      method: 'get',
      summary: '查询指定用户信息',
      parameters: {
        path: {
          id: Joi.number().integer().required()
            .description('用户 id'),
        },
      },
      responses: {
        200: {
          schema: {
            id: Joi.number().integer().required()
              .description('用户 ID'),
            name: Joi.string().length(10).required()
              .description('姓名'),
            age: Joi.number().integer().required()
              .description('年龄'),
            phone: Joi.string().regex(/^[0-9]{11}$/, 'phone').required()
              .description('电话号码'),
          },
        },
        404: {
          schema: components.responses.notFound,
        },
      },
    },
  };

};
