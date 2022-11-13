import { Name } from './name.value-object'
import { Either, Result } from '../../../../../shared/core/Result'
import { NameError } from './name.error'
import { AppError } from '../../../../../shared/core/AppError'

export type NameResponse = Either<
   | AppError.UnexpectedError
   | NameError.InvalidNameError
   | NameError.TooLongNameError
   | NameError.TooShortNameError
   | Result<any>,
   Result<Name>
>
