import type { Either, Result } from '../../../../shared/core/Result'
import type { HaveABirthdayCatErrors } from './have-a-birthday-cat.errors'
import type { AppError } from '../../../../shared/core/AppError'

export type HaveABirthdayCatResponse = Either<
   | AppError.UnexpectedError
   | HaveABirthdayCatErrors.CatNotFoundError
   | HaveABirthdayCatErrors.TooOldCatError
   | Result<any>,
   Result<void>
>
