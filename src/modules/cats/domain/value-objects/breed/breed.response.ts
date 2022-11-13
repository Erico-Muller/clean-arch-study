import { Breed } from './breed.value-object'
import { Either, Result } from '../../../../../shared/core/Result'
import { BreedError } from './breed.error'
import { AppError } from '../../../../../shared/core/AppError'

export type BreedResponse = Either<
   | AppError.UnexpectedError
   | BreedError.InvalidBreedError
   | BreedError.TooLongBreedError
   | BreedError.TooShortBreedError
   | Result<any>,
   Result<Breed>
>
