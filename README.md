# egg-joi-swagger

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][codecov-image]][codecov-url]
[![David deps][david-image]][david-url]
[![Known Vulnerabilities][snyk-image]][snyk-url]
[![npm download][download-image]][download-url]

[npm-image]: https://img.shields.io/npm/v/egg-joi-swagger.svg?style=flat-square
[npm-url]: https://npmjs.org/package/egg-joi-swagger
[travis-image]: https://img.shields.io/travis/laoya/egg-joi-swagger.svg?style=flat-square&t=1
[travis-url]: https://travis-ci.org/laoya/egg-joi-swagger
[codecov-image]: https://img.shields.io/codecov/c/github/laoya/egg-joi-swagger.svg?style=flat-square
[codecov-url]: https://codecov.io/github/laoya/egg-joi-swagger?branch=master
[david-image]: https://img.shields.io/david/laoya/egg-joi-swagger.svg?style=flat-square
[david-url]: https://david-dm.org/laoya/egg-joi-swagger
[snyk-image]: https://snyk.io/test/npm/egg-joi-swagger/badge.svg?style=flat-square
[snyk-url]: https://snyk.io/test/npm/egg-joi-swagger
[download-image]: https://img.shields.io/npm/dm/egg-joi-swagger.svg?style=flat-square
[download-url]: https://npmjs.org/package/egg-joi-swagger

<!--
Description here.
-->

## Install

```bash
$ npm i egg-joi-swagger --save
```

## Usage

```js
// {app_root}/config/plugin.js
exports.joiSwagger = {
  enable: true,
  package: 'egg-joi-swagger',
};
```

## Configuration

```js
// {app_root}/config/config.default.js
exports.joiSwagger = {
};
```

see [config/config.default.js](config/config.default.js) for more detail.

## Example

<!-- example here -->

## Questions & Suggestions

Please open an issue [here](https://github.com/eggjs/egg/issues).

## License

[MIT](LICENSE)
