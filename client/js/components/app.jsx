var _ = require('lodash')
var React = require('react')
var Navigation = require('react-router').Navigation;
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

  mixins: [ListenerMixin, Navigation],

  statics: {
    fetchData (params) {
      console.log('App:fetchData')
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
      return Promise.all(promises).then(() => data)
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

  handleRefreshClick() {
    console.log('App:handleRefreshClick')
    haikuActions.randomizeHaiku()

    // We're not in render, so don't rely on
    // component's state at this point. Read from store
    var currentState = haikuStore.getState()
    this.transitionTo('haiku', {
      lineOneSlug: currentState.haiku.line1.slug,
      lineTwoSlug: currentState.haiku.line2.slug,
      lineThreeSlug: currentState.haiku.line3.slug
    })
  },

  render: function () {
    console.log('App:render')
    return (
      <div>
        <div>
          {this.state.haiku.line1.phrase}
        </div>
        <div>
          {this.state.haiku.line2.phrase}
        </div>
        <div>
          {this.state.haiku.line3.phrase}
        </div>
        <button onClick={this.handleRefreshClick}>Roll again</button>
      </div>
    );
  }
})

module.exports = App
