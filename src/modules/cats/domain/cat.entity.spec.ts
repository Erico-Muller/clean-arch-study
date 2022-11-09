import { Cat } from './cat.entity'

function createDefaultCat() {
   const cat = Cat.create({
      name: 'Cat',
      age: 2,
      breed: 'Siamese',
   })

   return cat.getValue()
}

describe('Cat Entity Tests', () => {
   it('Should be able to create a new cat', () => {
      const cat = createDefaultCat()

      expect(cat).toBeInstanceOf(Cat)
      expect(cat.name).toBe('Cat')
   })

   it('Should not be able to create a new cat, throwing "Too old cat"', () => {
      const cat = Cat.create({
         name: 'Cat',
         age: 28,
         breed: 'Siamese',
      })

      expect(cat.getErrorValue()).toBe('Too old cat')
   })

   it('Should not be able to create a new cat, throwing "Invalid age"', () => {
      const cat = Cat.create({
         name: 'Cat',
         age: -2,
         breed: 'Siamese',
      })

      expect(cat.getErrorValue()).toBe('Invalid age')
   })

   it('Should be able to create a new cat and make it have a birthday', () => {
      const cat = createDefaultCat()

      expect(cat).toBeInstanceOf(Cat)
      expect(cat.age).toBe(2)

      cat.haveABirthday()

      expect(cat.age).toBe(3)
   })

   it('Should be able to create a new cat, but not to make it have a birthday', () => {
      const cat = Cat.create({
         name: 'Cat',
         age: 25,
         breed: 'Siamese',
      }).getValue()

      expect(cat).toBeInstanceOf(Cat)
      expect(cat.age).toBe(25)

      expect(cat.haveABirthday().getErrorValue()).toBe('Too old cat')
   })
})
