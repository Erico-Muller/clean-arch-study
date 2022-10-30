import { Cat } from './cat.entity'

function createDefaultCat() {
   const cat = Cat.create({
      name: 'Cat',
      age: 2,
      breed: 'Siamese',
   })

   return cat
}

describe('Cat Entity Tests', () => {
   it('Should be able to create a new cat', () => {
      const cat = createDefaultCat()

      expect(cat).toBeInstanceOf(Cat)
      expect(cat.name).toBe('Cat')
   })

   it('Should not be able to create a new cat, throwing "Too old cat"', () => {
      expect(() =>
         Cat.create({
            name: 'Cat',
            age: 28,
            breed: 'Siamese',
         }),
      ).toThrowError('Too old cat')
   })

   it('Should not be able to create a new cat, throwing "Invalid age"', () => {
      expect(() =>
         Cat.create({
            name: 'Cat',
            age: -1,
            breed: 'Siamese',
         }),
      ).toThrowError('Invalid age')
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
      })

      expect(cat).toBeInstanceOf(Cat)
      expect(cat.age).toBe(25)

      expect(() => cat.haveABirthday()).toThrowError('Too old cat')
   })
})
