import { Identifier } from './identifier.value-object'
import { Either, Result } from '../../../../../shared/core/Result'
import { IdentifierError } from './identifier.error'
import { AppError } from '../../../../../shared/core/AppError'

export type IdentifierResponse = Either<
   | AppError.UnexpectedError
   | IdentifierError.InvalidIdentifierError
   | Result<any>,
   Result<Identifier>
>
