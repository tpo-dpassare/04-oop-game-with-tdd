/* eslint-env mocha */
/* global expect, Phrase */

'use strict'

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

      it('must be converted to lower case', () => {
        const instance = new Phrase('TEST')
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
          parentElement = window.ui.phraseList
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

    it('must have a property called "checkLetter"', () => {
      const instance = new Phrase()
      expect(instance).to.have.property('checkLetter')
    })

    describe('the "checkLetter" property', () => {
      it('must be a function', () => {
        const instance = new Phrase('test')

        const expected = 'function'
        const actual = typeof instance.checkLetter

        expect(actual).to.equal(expected)
      })

      context('when called', () => {
        let instance = null

        before(() => {
          instance = new Phrase('hello world')
        })

        it('must return `true` if the specified letter is contained in the phrase', () => {
          const expected = true
          const actual = instance.checkLetter('h')

          expect(actual).to.equal(expected)
        })

        it('must return `false` if the specified letter is not contained in the phrase', () => {
          const expected = false
          const actual = instance.checkLetter('x')

          expect(actual).to.equal(expected)
        })
      })
    })

    it('must have a property called "showMatchedLetter"', () => {
      const instance = new Phrase()
      expect(instance).to.have.property('showMatchedLetter')
    })

    describe('the "showMatchedLetter" property', () => {
      it('must be a function', () => {
        const instance = new Phrase('test')

        const expected = 'function'
        const actual = typeof instance.showMatchedLetter

        expect(actual).to.equal(expected)
      })

      context('when called', () => {
        let instance = null
        let parentElement = null

        before(() => {
          instance = new Phrase('hello world')
          instance.addPhraseToDisplay()
          instance.showMatchedLetter('l')
          parentElement = window.ui.phraseList
        })

        after(() => {
          parentElement.innerHTML = ''
        })

        it('must update the CSS class names for each matched letter', () => {
          Array.from(parentElement.children)
            .filter((child) => {
              return child.textContent === 'l'
            })
            .forEach((child) => {
              const expected = ['show', 'letter', 'l']
              const actual = child.className.split(' ')

              expect(actual).to.have.members(expected)
            })
        })

        it('must not change the CSS class names for each unmatched letter', () => {
          Array.from(parentElement.children)
            .filter((child) => {
              return (child.textContent !== 'l' && child.textContent !== ' ')
            })
            .forEach((child) => {
              const expected = ['hide', 'letter', child.textContent]
              const actual = child.className.split(' ')

              expect(actual).to.have.members(expected)
            })
        })
      })
    })
  })
})
