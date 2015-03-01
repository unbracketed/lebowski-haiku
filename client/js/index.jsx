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
  console.log('fetchData')
  var data = {};
  return Promise.all(routes
    .filter(route => route.handler.fetchData)
    .map(route => {
      return route.handler.fetchData(params).then(d => {data[route.name] = d;});
    })
  ).then(() => data);
}


Router.run(routes, function (Handler, state) {
  console.log('Router.run', state.routes, state.params)
  var router = this;
  console.log('rendering Handler');
  React.render(<Handler/>, document.body)
  fetchData(state.routes, state.params).then((data) => {
    console.log('Router.run:fetchData.then', data);
    // dataActions.addPhrases(data.app)
  //
  //   if ('lineOneSlug' in state.params &&
  //       'lineTwoSlug' in state.params &&
  //       'lineThreeSlug' in state.params){
  //     haikuActions.selectPhrases(state.params)
  //   } else {
  //     haikuActions.randomizeHaiku(router.transitionTo)
  //   }
  //   console.log('rendering Handler');
  //   React.render(<Handler/>, document.body)
  },
  (reason) => {console.log(reason)})
})
