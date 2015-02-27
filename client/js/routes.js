
var Router = require('react-router')
var Route = Router.Route
var React = require('react')
var App = require('./app')

var routes = (
  <Route name="app" path="/" handler={App}>
    <Route name="haiku" path=":lineOneSlug/:lineTwoSlug/:lineThreeSlug" handler={App}/>
  </Route>
)

module.exports = routes
