"use strict";

var app = require('./components/app')
var log = require('loglevel')
var React = require('react')
var Router = require('react-router')
var routes = require('./routes')
var dataActions = require('./actions/data')
var haikuActions = require('./actions/haiku')
var haikuStore = require('./store')

// Log level setup
// if (config.debug) {
//   log.setLevel('debug');
// }

function fetchData(routes, params) {
  console.log('%cfetchData', 'background: gray')
  var data = {};
  return Promise.all(routes
    .filter(route => route.handler.fetchData)
    .map(route => {
      return route.handler.fetchData(params).then(d => {data[route.name] = d;});
    })
  ).then(() => data);
}


Router.run(routes, function (Handler, state) {
  console.log('%cRouter.run route=%s', 'background: gray', state.routes[state.routes.length-1].name, state)
  var activeRoute = state.routes[state.routes.length-1]
  console.log('%crendering Handler %s', 'background: gray', activeRoute.handler.displayName)
  React.render(<Handler/>, document.body)
  fetchData(state.routes, state.params).then((data) => {
    console.log('%cRouter.run:fetchData.then', 'background: gray', data);
  },
  (reason) => {console.log(reason)})
})
