'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.validate(ctx.schema.user.index);
    ctx.body = [];
  }

  async create() {
    const { ctx } = this;
    ctx.validate(ctx.schema.user.create);
    ctx.body = ctx.request.body;
  }

  async show() {
    const { ctx } = this;
    ctx.validate(ctx.schema.user.show);
    ctx.body = {};
  }
}

module.exports = UserController;
