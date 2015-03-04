var _ = require('lodash')
var React = require('react')
var Router = require('react-router')
var RouteHandler = Router.RouteHandler
var ListenerMixin = require('alt/mixins/ListenerMixin')
var haikuStore = require('../store')
var dataActions = require('../actions/data')
var haikuActions = require('../actions/haiku')


var getText = function(url) {
  return new Promise((resolve, reject) => {
    var req = new XMLHttpRequest();
    req.onload = function () {
      if (req.status === 404) {
        reject(new Error('not found'));
      } else {
        resolve(req.response)
      }
    };
    req.open('GET', url);
    req.send();
  });
}

var App = React.createClass({

  mixins: [ListenerMixin],

  statics: {
    fetchData (params) {
      console.log('%cApp:fetchData', 'background: orange')

      //check if data is loaded
      var currentState = haikuStore.getState()
      if (currentState.phrasesFives && currentState.phrasesSevens) {
        console.log('%cApp:fetchData data is loaded', 'background: orange');
        return Promise.resolve(true)
      } else {
        var data = {}
        var urls = {
          fives: '/assets/data/fives.txt',
          sevens: '/assets/data/sevens.txt'
        }
        var promises = []
        _.forIn(urls, (url, key) => {promises.push(
            getText(url)
              .then((textList) => {data[key] = _.filter(textList.split('\n'), (line) => (line.length > 0))})
        )})

        return Promise.all(promises).then(() => {
          dataActions.addPhrases(data)
          return true
        })
      }
    }
  },

  getInitialState() {
    var state = haikuStore.getState()
    console.log('%cApp:getInitialState', 'background: orange', state)
    return state
  },

  componentWillMount() {
    console.log('%cApp:componentWillMount', 'background: orange')
    this.listenTo(haikuStore, this.onChange)
  },

  onChange() {
    console.log('%cApp:onChange', 'background: orange');
    this.setState(this.getInitialState())
  },

  render: function () {
    console.log('%cApp:render (p,s)', 'background: orange', this.props, this.state)
    return <RouteHandler/>
  }
})

module.exports = App
