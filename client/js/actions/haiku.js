var alt = require('../alt')

class HaikuActions {
  constructor() {
    console.log('HaikuActions:constructor');
    // this.generateActions('randomizeHaiku')
  }
  randomizeHaiku() {
    console.log('HaikuActions:randomizeHaiku')
    this.dispatch()
  }
}

module.exports = alt.createActions(HaikuActions)
