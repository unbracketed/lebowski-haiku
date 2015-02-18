"use strict";

var app = require('./app')
var log = require('loglevel')
var React = require('react')
var Router = require('react-router')
var routes = require('./routes')

// Log level setup
// if (config.debug) {
//   log.setLevel('debug');
// }


Router.run(routes, function (Handler) {
  React.render(<Handler/>, document.body)
})
