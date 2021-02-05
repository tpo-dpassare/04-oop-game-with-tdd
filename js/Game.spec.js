/* eslint-env mocha */
/* global expect, Game, Phrase */

'use strict'

describe('meets expectations', () => {
  describe('the Game class', () => {
    it('must exist', () => {
      expect(() => {
        const instance = new Game() /* eslint-disable-line no-unused-vars */
      }).to.not.throw(/Game is not defined/)
    })

    it('must have a property called "missed"', () => {
      const instance = new Game()
      expect(instance).to.have.property('missed')
    })

    describe('the "missed" property', () => {
      it('must have the correct initial value', () => {
        const instance = new Game()

        const expected = 0
        const actual = instance.missed

        expect(actual).to.equal(expected)
      })
    })

    it('must have a property called "phrases"', () => {
      const instance = new Game()
      expect(instance).to.have.property('phrases')
    })

    describe('the "phrases" property', () => {
      let instance = null

      before(() => {
        instance = new Game()
      })

      it('must be an array', () => {
        const expected = true
        const actual = Array.isArray(instance.phrases)

        expect(actual).to.equal(expected)
      })

      it('must have at least 5 entries', () => {
        const minimum = 5
        const actual = instance.phrases.length

        expect(actual).to.be.at.least(minimum)
      })

      describe('each entry', () => {
        it('must be an instance of Phrase', () => {
          instance.phrases.forEach((phrase) => {
            expect(phrase).to.be.an.instanceOf(Phrase)
          })
        })

        it('must be at least 2 words long', () => {
          const wordPattern = /^[a-z]+( [a-z]+)+$/

          instance.phrases.forEach((phrase) => {
            expect(phrase.phrase).to.match(wordPattern)
          })
        })
      })
    })

    it('must have a property called "activePhrase"', () => {
      const instance = new Game()
      expect(instance).to.have.property('activePhrase')
    })

    describe('the "activePhrase" property', () => {
      it('must have the correct initial value', () => {
        const instance = new Game()

        const expected = null
        const actual = instance.activePhrase

        expect(actual).to.equal(expected)
      })
    })

    it('must have a property called "getRandomPhrase"', () => {
      const instance = new Game()
      expect(instance).to.have.property('getRandomPhrase')
    })

    describe('the "getRandomPhrase" property', () => {
      let instance = null

      before(() => {
        instance = new Game()
      })

      it('must be a function', () => {
        const expected = 'function'
        const actual = typeof instance.getRandomPhrase

        expect(actual).to.equal(expected)
      })

      context('when called', () => {
        it('must return an instance of Phrase', () => {
          const actual = instance.getRandomPhrase()
          expect(actual).to.be.instanceOf(Phrase)
        })

        it('must return one of the entries from "phrases"', () => {
          const choices = instance.phrases.map((phrase) => { return phrase.phrase })
          const actual = instance.getRandomPhrase().phrase

          expect(actual).to.be.oneOf(choices)
        })
      })
    })

    it('must have a property called "startGame"', () => {
      const instance = new Game()
      expect(instance).to.have.property('startGame')
    })

    describe('the "startGame" property', () => {
      let instance = null

      before(() => {
        instance = new Game()
      })

      after(() => {
        // reset display
        window.ui.phraseList.innerHTML = ''
      })

      it('must be a function', () => {
        const expected = 'function'
        const actual = typeof instance.startGame

        expect(actual).to.equal(expected)
      })

      context('when called', () => {
        before(() => {
          instance.startGame()
        })

        it('must hide the start screen overlay', () => {
          const expected = 'none'
          const actual = window.ui.startOverlay.style.display

          expect(actual).to.equal(expected)
        })

        it('must populate the "activePhrase" property from the choices available in "phrases"', () => {
          const choices = instance.phrases.map((phrase) => { return phrase.phrase })
          const actual = instance.activePhrase.phrase

          expect(actual).to.be.oneOf(choices)
        })

        it('must display the hidden letters for "activePhrase" on the screen', () => {
          const expected = instance.activePhrase.phrase.length
          const actual = window.ui.phraseList.children.length

          expect(actual).to.equal(expected)
        })
      })
    })

    it('must have a property called "checkForWin"', () => {
      const instance = new Game()
      expect(instance).to.have.property('checkForWin')
    })

    describe('the "checkForWin" property', () => {
      let instance = null

      before(() => {
        instance = new Game()
        instance.startGame()
      })

      after(() => {
        // reset display
        window.ui.phraseList.innerHTML = ''
      })

      it('must be a function', () => {
        const expected = 'function'
        const actual = typeof instance.checkForWin

        expect(actual).to.equal(expected)
      })

      context('when called before all of the letters in the active phrase are revealed', () => {
        before(() => {
          // reveal some of the letters
          instance.activePhrase.showMatchedLetter(instance.activePhrase.phrase.charAt(0))
        })

        it('must return false', () => {
          const expected = false
          const actual = instance.checkForWin()

          expect(actual).to.equal(expected)
        })
      })

      context('when called after all of the letters in the active phrase are revealed', () => {
        before(() => {
          // reveal all of the letters
          instance.activePhrase.phrase.split('').forEach((char) => {
            if (char !== ' ') {
              instance.activePhrase.showMatchedLetter(char)
            }
          })
        })

        it('must return true', () => {
          const expected = true
          const actual = instance.checkForWin()

          expect(actual).to.equal(expected)
        })
      })
    })
  })
})
