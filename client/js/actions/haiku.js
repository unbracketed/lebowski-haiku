var alt = require('../alt')

class HaikuActions {
  constructor() {
    console.log('%cHaikuActions:constructor', 'background: green; color: white')
  }
  displayHaiku() {
    console.log('%cHaikuActions:displayHaiku', 'background: green; color:white')
    this.dispatch()
  }
  randomizeHaiku() {
    console.log('%cHaikuActions:randomizeHaiku', 'background: green; color: white')
    this.dispatch()
  }
  selectPhrases(phrases) {
    console.log('%cHaikuActions:selectPhrases', 'background: green; color: white', phrases)
    this.dispatch(phrases)
  }
}

module.exports = alt.createActions(HaikuActions)
