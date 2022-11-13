import { Cat } from './cat.entity'

import {
   IdentifierError,
   NameError,
   AgeError,
   BreedError,
} from './value-objects'

function createDefaultCat() {
   const cat = Cat.create({
      name: 'Cat',
      age: 2,
      breed: 'Siamese',
   })

   return cat.value
}

describe('Cat Entity Tests', () => {
   it('Should be able to create a new cat', () => {
      const cat = createDefaultCat()

      expect(cat.isSuccess).toBeTruthy()
      expect(cat.getValue()).toBeInstanceOf(Cat)
   })

   it('Should not be able to create a new cat with an invalid id', () => {
      const cat = Cat.create(
         {
            name: 'Cat',
            age: 28,
            breed: 'Siamese',
         },
         'asdfg',
      )

      expect(cat.value).toBeInstanceOf(IdentifierError.InvalidIdentifierError)
   })

   it('Should not be able to create a new cat with a too long name', () => {
      const cat = Cat.create({
         name: 'x'.repeat(40),
         age: 28,
         breed: 'Siamese',
      })

      expect(cat.value).toBeInstanceOf(NameError.TooLongNameError)
   })

   it('Should not be able to create a new cat with a too short name', () => {
      const cat = Cat.create({
         name: 'x',
         age: 28,
         breed: 'Siamese',
      })

      expect(cat.value).toBeInstanceOf(NameError.TooShortNameError)
   })

   it('Should not be able to create a new cat with an invalid name', () => {
      const cat = Cat.create({
         name: null,
         age: 28,
         breed: 'Siamese',
      })

      expect(cat.value).toBeInstanceOf(NameError.InvalidNameError)
   })

   it('Should not be able to create a new cat with a too high age', () => {
      const cat = Cat.create({
         name: 'Cat',
         age: 28,
         breed: 'Siamese',
      })

      expect(cat.value).toBeInstanceOf(AgeError.TooOldCatError)
   })

   it('Should not be able to create a new cat, throwing "Invalid age"', () => {
      const cat = Cat.create({
         name: 'Cat',
         age: -2,
         breed: 'Siamese',
      })

      expect(cat.value).toBeInstanceOf(AgeError.InvalidAgeError)
   })

   it('Should not be able to create a new cat with a too long breed', () => {
      const cat = Cat.create({
         name: 'Cat',
         age: 2,
         breed: 'x'.repeat(40),
      })

      expect(cat.value).toBeInstanceOf(BreedError.TooLongBreedError)
   })

   it('Should not be able to create a new cat with a too short breed', () => {
      const cat = Cat.create({
         name: 'Cat',
         age: 2,
         breed: 'x',
      })

      expect(cat.value).toBeInstanceOf(BreedError.TooShortBreedError)
   })

   it('Should not be able to create a new cat with an invalid breed', () => {
      const cat = Cat.create({
         name: 'Cat',
         age: 2,
         breed: null,
      })

      expect(cat.value).toBeInstanceOf(BreedError.InvalidBreedError)
   })

   it('Should be able to create a new cat and make it have a birthday', () => {
      const cat = createDefaultCat()

      expect(cat.getValue()).toBeInstanceOf(Cat)

      cat.getValue().haveABirthday()

      expect(cat.getValue().age).toBe(3)
   })

   it('Should be able to create a new cat, but not to make it have a birthday', () => {
      const cat = Cat.create({
         name: 'Cat',
         age: 25,
         breed: 'Siamese',
      })

      expect(cat.value.getValue()).toBeInstanceOf(Cat)

      const birthdayResult = cat.value.getValue().haveABirthday()

      expect(birthdayResult.isFailure).toBeTruthy()
   })
})
