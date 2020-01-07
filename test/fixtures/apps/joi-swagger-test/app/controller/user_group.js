'use strict';

const Controller = require('egg').Controller;

class UserGroupController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.validate(ctx.schema.userGroup.index);
    ctx.body = [];
  }
}

module.exports = UserGroupController;
