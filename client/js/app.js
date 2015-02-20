var React = require('react')
var ListenerMixin = require('alt/mixins/ListenerMixin')
var haikuStore = require('./store')
var dataActions = require('./actions/data')


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
      console.log('App:fetchData');
      return getText('/assets/data/fives.txt').then((textList) => textList.split('\n'))
    }
  },

  getInitialState() {
    console.log('App:getInitialState', haikuStore.getState());
    return haikuStore.getState()
  },

  componentWillMount() {
    console.log('App:componentWillMount');
    this.listenTo(haikuStore, this.onChange)
  },

  onChange() {
    console.log('App:onChange');
    this.setState(this.getInitialState())
  },

  render: function () {
    return (
      <div>
        <div>
          {this.state.haiku.line1}
        </div>
        <div>
          {this.state.haiku.line2}
        </div>
        <div>
          {this.state.haiku.line3}
        </div>
      </div>
    );
  }
})

module.exports = App
