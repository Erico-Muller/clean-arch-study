import { Age } from './age.value-object'

describe('Age value-object', () => {
   it('Should be able to instantiate an Age', () => {
      const age = new Age(2)

      expect(age.value).toBe(2)
   })

   it('Should not be able to instantiate an Age with a negative number, throwing "Invalid age"', () => {
      expect(() => new Age(-1)).toThrowError('Invalid age')
   })

   it('Should not be able to instantiate an Age with a floating number, throwing "Invalid age"', () => {
      expect(() => new Age(1.5)).toThrowError('Invalid age')
   })

   it('Should not be able to instantiate an Age with a null value, throwing "Invalid age"', () => {
      expect(() => new Age(null)).toThrowError('Invalid age')
   })
})
