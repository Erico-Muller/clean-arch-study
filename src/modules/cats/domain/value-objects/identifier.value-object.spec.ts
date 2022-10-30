import { Identifier } from './identifier.value-object'
import { v4 as uuid } from 'uuid'

describe('Identifier value-object', () => {
   it('Should be able to instantiate an Identifier', () => {
      const identifier = uuid()

      expect(new Identifier(identifier).value).toBe(identifier)
   })

   it('Should not be able to instantiate an Identifier, throwing "Invalid identifier"', () => {
      expect(() => new Identifier('asdfg')).toThrowError('Invalid identifier')
   })

   it('Should not be able to instantiate an Identifier with an empty value, throwing "Invalid identifier"', () => {
      expect(() => new Identifier('')).toThrowError('Invalid identifier')
   })

   it('Should not be able to instantiate an Identifier with a null value, throwing "Invalid identifier"', () => {
      expect(() => new Identifier(null)).toThrowError('Invalid identifier')
   })
})
