var React = require('react')
var Router = require('react-router')
var DefaultRoute = Router.DefaultRoute
var Navigation = Router.Navigation
var haikuActions = require('../actions/haiku')
var haikuStore = require('../store')


var Haiku = React.createClass({

  mixins: [Navigation],

  handleRefreshClick() {
    console.log('Haiku:handleRefreshClick')
    haikuActions.randomizeHaiku()
    var _state = haikuStore.getState()
    this.transitionTo('haiku', {
      lineOneSlug: _state.haiku.line1.slug,
      lineTwoSlug: _state.haiku.line2.slug,
      lineThreeSlug: _state.haiku.line3.slug,
    })
    // We're not in render, so don't rely on
    // component's state at this point. Read from store
    // var currentState = haikuStore.getState()
    // this.transitionTo('haiku', {
    //   lineOneSlug: currentState.haiku.line1.slug,
    //   lineTwoSlug: currentState.haiku.line2.slug,
    //   lineThreeSlug: currentState.haiku.line3.slug
    // })
  },
  render: function() {
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
