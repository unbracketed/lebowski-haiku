var _ = require('lodash')
var React = require('react')
var Router = require('react-router')
var RouteHandler = Router.RouteHandler;
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
      console.log('App:fetchData')

      //check if data is loaded
      var currentState = haikuStore.getState()
      if (currentState.phrasesFives && currentState.phrasesSevens) {
        console.log('App:fetchData returning data from store');
        return Promise.resolve({'fives': currentState.phrasesFives, 'sevens': currentState.phrasesSevens})
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
    console.log('App:getInitialState', haikuStore.getState())
    return haikuStore.getState()
  },

  componentWillMount() {
    console.log('App:componentWillMount')
    this.listenTo(haikuStore, this.onChange)
  },

  onChange() {
    console.log('App:onChange');
    this.setState(this.getInitialState())
  },

  render: function () {
    console.log('App:render (p,s)', this.props, this.state)
    var handlerProps = {
      dataPresent: false
    }
    if (this.state.displayHaiku) {
      handlerProps = {
        lineOne: this.state.haiku.line1.phrase,
        lineTwo: this.state.haiku.line2.phrase,
        lineThree: this.state.haiku.line3.phrase,
        dataPresent: true
      }
    } else if (_.keys(this.state.phrasesFives).length) {
      handlerProps = {
        dataPresent: true
      }
    }
    return (
      <RouteHandler {...handlerProps}/>
    );
  }
})

module.exports = App
