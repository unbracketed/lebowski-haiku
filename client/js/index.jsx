"use strict";

var app = require('./app')
var log = require('loglevel')
var React = require('react')
var Router = require('react-router')
var routes = require('./routes')
var dataActions = require('./actions/data')
var haikuActions = require('./actions/haiku')

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
  fetchData(state.routes, state.params).then((data) => {
    console.log('Router.run:fetchData', data);
    dataActions.addPhrases(data.app)
    haikuActions.randomizeHaiku()
    React.render(<Handler/>, document.body)
  },
  (reason) => {console.log(reason)})
})
