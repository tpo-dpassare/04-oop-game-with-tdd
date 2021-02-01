/* eslint-env mocha */
/* global Phrase */

'use strict'

const expect = window.chai.expect

describe('meets expectations', () => {
  describe('the Phrase class', () => {
    it('must exist', () => {
      expect(() => {
        const instance = new Phrase()
      }).to.not.throw(/Phrase is not defined/)
    })

    it('must have a property called "phrase"', () => {
      const instance = new Phrase()
      expect(instance).to.have.property('phrase')
    })

    context('when a value is provided to the constructor', () => {
      it('must be returned from the "phrase" property', () => {
        const instance = new Phrase('test')
        const actual = instance.phrase

        expect(actual).to.equal('test')
      })
    })
  })
})
