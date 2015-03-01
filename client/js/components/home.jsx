var React = require('react')
var Navigation = require('react-router').Navigation
var haikuActions = require('../actions/haiku')
var haikuStore = require('../store')

var Home = React.createClass({

  mixins: [Navigation],

  handleClick: function() {
    haikuActions.randomizeHaiku()
    haikuActions.displayHaiku()
    var _state = haikuStore.getState()
    this.transitionTo('haiku', {
      lineOneSlug: _state.haiku.line1.slug,
      lineTwoSlug: _state.haiku.line2.slug,
      lineThreeSlug: _state.haiku.line3.slug,
    })
  },

  render: function() {
    console.log('Home:render (p,s)', this.props, this.state)
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
