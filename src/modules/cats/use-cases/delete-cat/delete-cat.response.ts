import type { Either, Result } from '../../../../shared/core/Result'
import type { DeleteCatErrors } from './delete-cat.errors'
import type { AppError } from '../../../../shared/core/AppError'

export type DeleteCatResponse = Either<
   AppError.UnexpectedError | DeleteCatErrors.CatNotFoundError | Result<any>,
   Result<void>
>
