import { Either, Result } from '../../../../shared/core/Result'
import { AppError } from '../../../../shared/core/AppError'

export type CreateCatResponse = Either<
   AppError.UnexpectedError | Result<any>,
   Result<void>
>
