import { Breed } from './breed.value-object'

describe('Breed value-object', () => {
   it('Should be able to instantiate a Breed', () => {
      const breedOrError = Breed.create('Siamese')

      expect(breedOrError.isSuccess).toBeTruthy()
      expect(breedOrError.getValue().value).toBe('Siamese')
   })

   it('Should not be able to instantiate a Breed with a wrong length', () => {
      let breedOrError = Breed.create('')
      expect(breedOrError.isFailure).toBeTruthy()

      breedOrError = Breed.create('x'.repeat(40))
      expect(breedOrError.isFailure).toBeTruthy()
   })
})
