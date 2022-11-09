import { Identifier } from './identifier.value-object'
import { v4 as uuid } from 'uuid'

describe('Identifier value-object', () => {
   it('Should be able to instantiate an Identifier', () => {
      const identifier = uuid()

      const identifierOrError = Identifier.create(identifier)

      expect(identifierOrError.isSuccess).toBeTruthy()
      expect(identifierOrError.getValue().value).toBe(identifier)
   })

   it('Should not be able to instantiate an Identifier', () => {
      const identifierOrError = Identifier.create('asdfg')

      expect(identifierOrError.isFailure).toBeTruthy()
   })

   it('Should not be able to instantiate an Identifier with an empty value', () => {
      const identifierOrError = Identifier.create('')

      expect(identifierOrError.isFailure).toBeTruthy()
   })
})
