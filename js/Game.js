/* global Phrase */

class Game {
  constructor () {
    this.missed = 0
    this.phrases = [
      new Phrase('eloquent javascript'),
      new Phrase('clean agile'),
      new Phrase('code complete'),
      new Phrase('continuous delivery'),
      new Phrase('extreme programming explained')
    ]
    this.activePhrase = null
  }

  getRandomPhrase () {
    const randomIndex = Math.floor(Math.random() * this.phrases.length)
    return this.phrases[randomIndex]
  }

  startGame () {
    window.ui.startOverlay.style.display = 'none'
    this.activePhrase = this.getRandomPhrase()
    this.activePhrase.addPhraseToDisplay()
  }
}
