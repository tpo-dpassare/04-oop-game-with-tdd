/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Phrase.js
 */

class Phrase {
  constructor (phrase) {
    this._phrase = phrase
  }

  get phrase () {
    return this._phrase
  }

  addPhraseToDisplay () {
    for (let i = 0; i < this._phrase.length; i++) {
      window.ui.phraseList.insertAdjacentHTML(
        'beforeend',
        window.templates.render(window.templates.letter, this._phrase.charAt(i))
      )
    }
  }
}
