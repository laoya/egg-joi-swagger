'use strict';

module.exports = app => {
  const { router, controller } = app;

  router.get('/user/group', controller.userGroup.index);

  router.get('/', controller.home.index);
  router.get('/user', controller.user.index);
  router.post('/user', controller.user.create);
  router.get('/user/:id', controller.user.show);

};
