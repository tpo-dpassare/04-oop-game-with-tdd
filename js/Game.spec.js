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
  })
})
