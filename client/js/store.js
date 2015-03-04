var _ = require('lodash')
var alt = require('./alt')
var slug = require('slug')
var Router = require('react-router')
var DataActions = require('./actions/data')
var HaikuActions = require('./actions/haiku')



class HaikuStore {
  constructor() {
    console.log('%cHaikuStore:constructor', 'background: blue; color: white')
    this.bindActions(DataActions)
    this.bindActions(HaikuActions)
    this.phrasesFives = null
    this.phrasesSevens = null
    this.haiku = null
  }

  onAddPhrases(phrases) {
    console.log('%cHaikuStore:addPhrases', 'background: blue; color: white', phrases)
    if (!this.phrasesFives) this.phrasesFives = {}
    if (!this.phrasesSevens) this.phrasesSevens = {}
    _.forEach(phrases.fives, (fiver) => {this.phrasesFives[slug(fiver)] = fiver})
    _.forEach(phrases.sevens, (seven) => {this.phrasesSevens[slug(seven)] = seven})
  }

  onRandomizeHaiku() {
    console.log('%cHaikuStore:onRandomizeHaiku', 'background: blue; color: white')

    var randomProp = (obj) => {
      var result
      var count = 0
      for (var prop in obj)
          if (Math.random() < 1/++count)
             result = prop
      return {slug: result, phrase: obj[result]}
    }
    var r1 = randomProp(this.phrasesFives)
    var r2 = randomProp(this.phrasesSevens)
    var r3 = randomProp(this.phrasesFives)

    this.haiku = {
      line1: r1,
      line2: r2,
      line3: r3
    }
  }

  onSelectPhrases(phrases) {
    this.haiku = {
      line1: {
        slug: phrases.lineOneSlug,
        phrase: this.phrasesFives[phrases.lineOneSlug]
      },
      line2: {
        slug: phrases.lineTwoSlug,
        phrase: this.phrasesSevens[phrases.lineTwoSlug]
      },
      line3: {
        slug: phrases.lineThreeSlug,
        phrase: this.phrasesFives[phrases.lineThreeSlug]
      }
    }
  }

}

var haikuStore = alt.createStore(HaikuStore)
module.exports = haikuStore;
