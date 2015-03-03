var React = require('react')
var Navigation = require('react-router').Navigation
var haikuActions = require('../actions/haiku')
var haikuStore = require('../store')

var Home = React.createClass({

  propTypes: {
    dataPresent: React.PropTypes.bool.isRequired
  },

  mixins: [Navigation],

  handleClick: function() {
    console.log('%cHome:handleClick', 'background: orange');
    haikuActions.randomizeHaiku()
    haikuActions.displayHaiku()
    var _state = haikuStore.getState()
    console.log('%ctransition to haiku', 'background:gray', _state)
    this.transitionTo('haiku', {
      lineOneSlug: _state.haiku.line1.slug,
      lineTwoSlug: _state.haiku.line2.slug,
      lineThreeSlug: _state.haiku.line3.slug,
    })
  },

  render: function() {
    console.log('%cHome:render (p,s)', 'background: orange', this.props, this.state)
    var content = ''
    if (this.props.dataPresent) {
      content = <button onClick={this.handleClick}>White Russian</button>
    }
    return (
      <div>Dude Abides {content}</div>
    )
  }

})

module.exports = Home
