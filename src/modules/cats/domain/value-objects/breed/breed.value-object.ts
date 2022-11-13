import { Result, left, right } from '../../../../../shared/core/Result'
import { BreedResponse } from './breed.response'
import { BreedError } from './breed.error'

export class Breed {
   private constructor(public value: string) {}

   public static create(value: string): BreedResponse {
      try {
         const breed = new Breed(value)

         if (breed.value.length > 30)
            return left(new BreedError.TooLongBreedError())
         if (breed.value.length < 3)
            return left(new BreedError.TooShortBreedError())

         return right(Result.ok<Breed>(breed))
      } catch {
         return left(new BreedError.InvalidBreedError())
      }
   }
}
