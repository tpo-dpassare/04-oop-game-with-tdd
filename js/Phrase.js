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
      const char = this._phrase.charAt(i)

      window.ui.phraseList.insertAdjacentHTML(
        'beforeend',
        window.templates.render(
          window.templates.letter,
          (
            char === ' '
              ? 'space'
              : `hide letter ${char}`
          ),
          char
        )
      )
    }
  }

  checkLetter (letter) {
    return (this._phrase.indexOf(letter) > -1)
  }

  showMatchedLetter (letter) {
    const className = `.${letter}`

    window.ui.phraseList.querySelectorAll(className).forEach((child) => {
      child.classList.replace('hide', 'show')
    })
  }
}
