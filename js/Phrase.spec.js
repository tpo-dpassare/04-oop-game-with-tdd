/* eslint-env mocha */
/* global Phrase */

'use strict'

const expect = window.chai.expect

describe('meets expectations', () => {
  describe('the Phrase class', () => {
    it('must exist', () => {
      expect(() => {
        const instance = new Phrase() /* eslint-disable-line no-unused-vars */
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

    it('must have a property called "addPhraseToDisplay"', () => {
      const instance = new Phrase()
      expect(instance).to.have.property('addPhraseToDisplay')
    })

    describe('the "addPhraseToDisplay" property', () => {
      it('must be a function', () => {
        const instance = new Phrase('test')

        const expected = 'function'
        const actual = typeof instance.addPhraseToDisplay

        expect(actual).to.equal(expected)
      })

      context('when called with a multi-word phrase', () => {
        let instance = null
        let parentElement = null

        before(() => {
          instance = new Phrase('hello world')
          instance.addPhraseToDisplay()
          parentElement = document.querySelector('#phrase UL')
        })

        after(() => {
          parentElement.innerHTML = ''
        })

        it('must create an element for each character', () => {
          const expected = instance.phrase.length
          const actual = parentElement.children.length

          expect(actual).to.equal(expected)
        })

        describe('each element', () => {
          let elements = null

          before(() => {
            elements = parentElement.children
          })

          it('must be an LI', () => {
            elements.forEach((elem) => {
              const expected = 'LI'
              const actual = elem.tagName

              expect(actual).to.equal(expected)
            })
          })

          it('must contain the appropriate character', () => {
            elements.forEach((elem, idx) => {
              const expected = instance.phrase.charAt(idx)
              const actual = elem.textContent

              expect(actual).to.equal(expected)
            })
          })

          it('must have the expected CSS class names', () => {
            elements.forEach((elem, idx) => {
              const expected = (
                instance.phrase.charAt(idx) === ' '
                  ? ['space']
                  : ['hide', 'letter', instance.phrase.charAt(idx)]
              )

              const actual = elem.className.split(' ')

              expect(actual).to.have.members(expected)
            })
          })
        })
      })
    })
  })
})
