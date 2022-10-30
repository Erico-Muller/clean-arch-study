import { Name } from './name.value-object'

describe('Name value-object', () => {
   it('Should be able to instantiate a Name', () => {
      const name = new Name('John Doe')

      expect(name.value).toBe('John Doe')
   })

   it('Should not be able to instantiate a Name with a wrong length, throwing "Invalid name"', () => {
      expect(() => new Name('')).toThrowError('Invalid name')
      expect(() => new Name('x'.repeat(40))).toThrowError('Invalid name')
   })

   it('Should not be able to instantiate a Name with a null value, throwing "Invalid name"', () => {
      expect(() => new Name(null)).toThrowError('Invalid name')
   })
})
