"use strict";

var app = require('./app')
var log = require('loglevel')
var React = require('react')
var Router = require('react-router')
var routes = require('./routes')
var EventEmitter = require('events').EventEmitter;
var loadingEvents = new EventEmitter();

// Log level setup
// if (config.debug) {
//   log.setLevel('debug');
// }

function fetchData(routes, params) {
  var data = {};
  return Promise.all(routes
    .filter(route => route.handler.fetchData)
    .map(route => {
      return route.handler.fetchData(params).then(d => {data[route.name] = d;});
    })
  ).then(() => data);
}

Router.run(routes, function (Handler, state) {
  loadingEvents.emit('loadStart');

  fetchData(state.routes, state.params).then((data) => {
    loadingEvents.emit('loadEnd');
    React.render(<Handler/>, document.body)
  })
})
