import type { Either, Result } from '../../../../shared/core/Result'
import type { HaveABirthdayCatError } from './have-a-birthday-cat.error'
import type { AppError } from '../../../../shared/core/AppError'

export type HaveABirthdayCatResponse = Either<
   | AppError.UnexpectedError
   | HaveABirthdayCatError.CatNotFoundError
   | HaveABirthdayCatError.TooOldCatError
   | Result<any>,
   Result<void>
>
