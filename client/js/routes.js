var Router = require('react-router')
var Route = Router.Route
var DefaultRoute = Router.DefaultRoute
var React = require('react')
var App = require('./components/app')
var Haiku = require('./components/haiku')
var Home = require('./components/home')


var routes = (
  <Route name="app" path="/" handler={App}>
    <Route name="haiku" path=":lineOneSlug/:lineTwoSlug/:lineThreeSlug" handler={Haiku}/>
    <DefaultRoute handler={Home}/>
  </Route>
)

module.exports = routes
