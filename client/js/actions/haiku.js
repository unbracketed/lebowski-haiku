var alt = require('../alt')

class HaikuActions {
  constructor() {
    console.log('HaikuActions:constructor');
  }
  randomizeHaiku() {
    console.log('HaikuActions:randomizeHaiku')
    this.dispatch()
  }
  selectPhrases(phrases) {
    console.log('HaikuActions:selectPhrases', phrases)
    this.dispatch(phrases)
  }
}

module.exports = alt.createActions(HaikuActions)
