import { Age } from './age.value-object'
import { Either, Result } from '../../../../../shared/core/Result'
import { AgeError } from './age.error'
import { AppError } from '../../../../../shared/core/AppError'

export type AgeResponse = Either<
   | AppError.UnexpectedError
   | AgeError.InvalidAgeError
   | AgeError.TooOldCatError
   | Result<any>,
   Result<Age>
>
