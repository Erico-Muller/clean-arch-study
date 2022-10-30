import { Breed } from './breed.value-object'

describe('Breed value-object', () => {
   it('Should be able to instantiate a Breed', () => {
      const breed = new Breed('Siamese')

      expect(breed.value).toBe('Siamese')
   })

   it('Should not be able to instantiate a Breed with a wrong length, throwing "Invalid breed"', () => {
      expect(() => new Breed('')).toThrowError('Invalid breed')
      expect(() => new Breed('x'.repeat(40))).toThrowError('Invalid breed')
   })

   it('Should not be able to instantiate a Breed with a null value, throwing "Invalid Breed"', () => {
      expect(() => new Breed(null)).toThrowError('Invalid breed')
   })
})
