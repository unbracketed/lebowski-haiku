var React = require('react')
var Router = require('react-router')
var Navigation = Router.Navigation
var haikuActions = require('../actions/haiku')
var haikuStore = require('../store')


var Haiku = React.createClass({

  mixins: [Navigation],

  handleRefreshClick() {
    console.log('%cHaiku:handleRefreshClick', 'background:orange')
    haikuActions.randomizeHaiku()
    // We're not in render, so don't rely on
    // component's state at this point. Read from store
    var _state = haikuStore.getState()
    console.log('%ctransition to haiku', 'background:gray', _state)
    this.transitionTo('haiku', {
      lineOneSlug: _state.haiku.line1.slug,
      lineTwoSlug: _state.haiku.line2.slug,
      lineThreeSlug: _state.haiku.line3.slug,
    })
  },

  render: function() {
    var state = haikuStore.getState()
    console.log('%cHaiku:render', 'background:orange', this.props, state)
    if (state.haiku) {
      return (
        <div>
          <div>
            {state.haiku.line1.phrase}
          </div>
          <div>
            {state.haiku.line2.phrase}
          </div>
          <div>
            {state.haiku.line3.phrase}
          </div>
          <button onClick={this.handleRefreshClick}>Roll again</button>
        </div>
      )
    } else {
      return <div>Resetting the pins...</div>
    }
  }

});

module.exports = Haiku;
