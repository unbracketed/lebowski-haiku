var alt = require('../alt')

class DataActions {
  constructor() {
    console.log('DataActions:constructor')
  }
  addPhrases(phrases) {
    console.log('DataActions:addPhrases', phrases);
    this.dispatch(phrases)
  }
}

var dataActions = alt.createActions(DataActions)
module.exports = dataActions
