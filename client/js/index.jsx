"use strict";

var log = require('loglevel')
var React = require('react')
var Router = require('react-router')
var routes = require('./routes')
 var haikuActions = require('./actions/haiku')

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
    console.log('%cRouter.run:fetchData.then', 'background: gray', data)

    //TODO figure out undefined for root route
    if (activeRoute.name === 'haiku') {
      haikuActions.selectPhrases(state.params)
    } else {
      haikuActions.randomizeHaiku()
    }
  },
  (reason) => {console.log(reason)})
})
