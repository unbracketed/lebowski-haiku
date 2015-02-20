var alt = require('./alt')
var DataActions = require('./actions/data')
var HaikuActions = require('./actions/haiku')


class HaikuStore {
  constructor() {
    console.log('HaikuStore:constructor')
    this.bindActions(DataActions)
    this.bindActions(HaikuActions)
    this.phrasesFive = []
    this.haiku = null
  }

  onAddPhrases(list) {
    console.log('HaikuStore:addPhrases', list)
    this.phrasesFive = list
  }

  onRandomizeHaiku() {
    console.log('HaikuStore:onRandomizeHaiku')
    this.haiku = {
      line1: this.phrasesFive[0],
      line2: 'TODO',
      line3: this.phrasesFive[1]
    }
    // var l1 = this.phrases5[0]
    // this.haiku = {line1: this.phrases5[]}
  }
}

var haikuStore = alt.createStore(HaikuStore)
module.exports = haikuStore;
