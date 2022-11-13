import { Breed } from './breed.value-object'
import { BreedError } from './breed.error'

describe('Breed value-object', () => {
   it('Should be able to instantiate a Breed', () => {
      const breedOrError = Breed.create('Siamese')

      expect(breedOrError.isRight()).toBeTruthy()
   })

   it('Should not be able to instantiate a Breed with a wrong length', () => {
      let breedOrError = Breed.create('')
      expect(breedOrError.value).toBeInstanceOf(BreedError.TooShortBreedError)

      breedOrError = Breed.create('x'.repeat(40))
      expect(breedOrError.value).toBeInstanceOf(BreedError.TooLongBreedError)
   })

   it('Should not be able to instantiate a Breed with a null value', () => {
      const breedOrError = Breed.create(null)
      expect(breedOrError.value).toBeInstanceOf(BreedError.InvalidBreedError)
   })
})
