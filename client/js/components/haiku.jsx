var React = require('react')
var Router = require('react-router')
var DefaultRoute = Router.DefaultRoute
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
    console.log('%cHaiku:render', 'background:orange', this.props, this.state)
    return (
      <div>
        <div>
          {this.props.lineOne}
        </div>
        <div>
          {this.props.lineTwo}
        </div>
        <div>
          {this.props.lineThree}
        </div>
        <button onClick={this.handleRefreshClick}>Roll again</button>
      </div>
    );
  }

});

module.exports = Haiku;
