import { Age } from './age.value-object'

describe('Age value-object', () => {
   it('Should be able to instantiate an Age', () => {
      const ageOrError = Age.create(2)

      expect(ageOrError.isSuccess).toBeTruthy()
      expect(ageOrError.getValue().value).toBe(2)
   })

   it('Should not be able to instantiate an Age with a negative number', () => {
      const ageOrError = Age.create(-2)
      expect(ageOrError.isFailure).toBeTruthy()
   })

   it('Should not be able to instantiate an Age with a floating number', () => {
      const ageOrError = Age.create(2.5)
      expect(ageOrError.isFailure).toBeTruthy()
   })
})
