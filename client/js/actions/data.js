var alt = require('../alt')

class DataActions {
  constructor() {
    console.log('%cDataActions:constructor', 'background: green; color: white')
  }
  addPhrases(phrases) {
    console.log('%cDataActions:addPhrases', 'background: green; color: white', phrases);
    this.dispatch(phrases)
  }
}

var dataActions = alt.createActions(DataActions)
module.exports = dataActions
