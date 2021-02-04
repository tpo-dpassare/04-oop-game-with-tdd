/* eslint-env mocha */
/* global expect, Game */

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
  })
})
