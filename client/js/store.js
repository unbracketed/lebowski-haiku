var alt = require('./alt')
var DataActions = require('./actions/data')
var HaikuActions = require('./actions/haiku')


class HaikuStore {
  constructor() {
    console.log('HaikuStore:constructor')
    this.bindActions(DataActions)
    this.bindActions(HaikuActions)
    this.phrasesFive = []
    this.phrasesSeven = []
    this.haiku = null
  }

  onAddPhrases(phrases) {
    console.log('HaikuStore:addPhrases', phrases)
    this.phrasesFive = phrases.fives
    this.phrasesSeven = phrases.sevens
  }

  onRandomizeHaiku() {
    console.log('HaikuStore:onRandomizeHaiku')

    var _r = (min, max) => (Math.floor(Math.random() * (max - min)) + min)
    var _5s = this.phrasesFive.length
    var _7s = this.phrasesSeven.length
    var r1 = _r(0, _5s)
    var r2 = _r(0, _7s)
    var r3 = _r(0, _5s)
    console.log(r1, r2, r3)

    this.haiku = {
      line1: this.phrasesFive[r1],
      line2: this.phrasesSeven[r2],
      line3: this.phrasesFive[r3]
    }
  }
}

var haikuStore = alt.createStore(HaikuStore)
module.exports = haikuStore;
