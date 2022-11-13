import { Either, Result } from '../../../../shared/core/Result'
import { AgeError } from '../../domain/value-objects'
import { AppError } from '../../../../shared/core/AppError'

export type CreateCatResponse = Either<
   AppError.UnexpectedError | AgeError.InvalidAgeError | Result<any>,
   Result<void>
>
