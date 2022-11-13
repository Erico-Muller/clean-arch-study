import { Age } from './age.value-object'
import { AgeError } from './age.error'

describe('Age value-object', () => {
   it('Should be able to instantiate an Age', () => {
      const ageOrError = Age.create(2)

      expect(ageOrError.isRight()).toBeTruthy()
   })

   it('Should not be able to instantiate an Age higher than 25', () => {
      const ageOrError = Age.create(26)
      expect(ageOrError.value).toBeInstanceOf(AgeError.TooOldCatError)
   })

   it('Should not be able to instantiate an Age with a negative number', () => {
      const ageOrError = Age.create(-2)
      expect(ageOrError.value).toBeInstanceOf(AgeError.InvalidAgeError)
   })

   it('Should not be able to instantiate an Age with a floating number', () => {
      const ageOrError = Age.create(2.5)
      expect(ageOrError.value).toBeInstanceOf(AgeError.InvalidAgeError)
   })
})
