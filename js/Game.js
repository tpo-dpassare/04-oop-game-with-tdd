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
    window.ui.overlay.style.display = 'none'
    this.activePhrase = this.getRandomPhrase()
    this.activePhrase.addPhraseToDisplay()
  }

  gameOver (status) {
    if (status === 'win') {
      window.ui.overlay.className = 'win'
      window.ui.overlayMessage.innerHTML = window.templates.winningMessage
    } else {
      window.ui.overlay.className = 'lose'
      window.ui.overlayMessage.innerHTML = window.templates.losingMessage
    }

    window.ui.overlay.style.display = ''
  }

  checkForWin () {
    return Array.from(window.ui.phraseList.children)
      .every((child) => {
        return child.classList.contains('space') || child.classList.contains('show')
      })
  }

  removeLife () {
    window.ui.missedList.children[this.missed].children[0].src = window.templates.missedImgSrc
    this.missed++

    if (this.missed === 4) {
      this.gameOver('lose')
    }
  }
}
