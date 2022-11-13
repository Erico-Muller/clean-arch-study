import { Cat } from './cat.entity'

import { Either, Result } from '../../../shared/core/Result'
import { AppError } from '../../../shared/core/AppError'

import {
   IdentifierError,
   NameError,
   AgeError,
   BreedError,
} from './value-objects'

export type CatResponse = Either<
   | AppError.UnexpectedError
   | IdentifierError.InvalidIdentifierError
   | NameError.InvalidNameError
   | NameError.TooLongNameError
   | NameError.TooShortNameError
   | AgeError.InvalidAgeError
   | BreedError.InvalidBreedError
   | BreedError.TooLongBreedError
   | BreedError.TooShortBreedError
   | Result<any>,
   Result<Cat>
>
