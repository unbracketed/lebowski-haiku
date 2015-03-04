var React = require('react')
var Router = require('react-router')
var {Navigation, Link} = Router
var haikuActions = require('../actions/haiku')
var haikuStore = require('../store')

var Home = React.createClass({

  mixins: [Navigation],

  render: function() {
    console.log('%cHome:render (p,s)', 'background: orange', this.props, this.state)
    var state = haikuStore.getState()
    var content = null
    if (state.haiku){
      content = (
        <Link
          to="haiku"
          params={{
            lineOneSlug: state.haiku.line1.slug,
            lineTwoSlug: state.haiku.line2.slug,
            lineThreeSlug: state.haiku.line3.slug
          }}>
          White Russian?
        </Link>
      )
    }
    return (
      <div className="Aligner">
        <div className="Aligner-item--fixed">Dude Abides {content}</div>
      </div>
    )
  }

})

module.exports = Home
