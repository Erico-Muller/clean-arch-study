import type { Either, Result } from '../../../../shared/core/Result'
import type { DeleteCatError } from './delete-cat.error'
import type { AppError } from '../../../../shared/core/AppError'

export type DeleteCatResponse = Either<
   AppError.UnexpectedError | DeleteCatError.CatNotFoundError | Result<any>,
   Result<void>
>
