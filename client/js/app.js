var React = require('react')


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

  statics: {
    fetchData (params) {
      // return getJSON(`${API}/contacts`).then((res) => res.contacts);
      return getText('https://raw.githubusercontent.com/unbracketed/lebowski/master/phrases_5.txt')
    }
  },

  getInitialState () {
    return { loading: false };
  },

  componentDidMount () {
    var timer;
    loadingEvents.on('loadStart', () => {
      clearTimeout(timer);
      // for slow responses, indicate the app is thinking
      // otherwise its fast enough to just wait for the
      // data to load
      timer = setTimeout(() => {
        this.setState({ loading: true });
      }, 300);
    });

    loadingEvents.on('loadEnd', () => {
      clearTimeout(timer);
      this.setState({ loading: false });
    });
  },

  render: function () {
    return (
      <div>Abide</div>
    );
  }
})

module.exports = App
