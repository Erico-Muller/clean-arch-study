import { Result } from '../../../../../shared/core/Result'
import { UseCaseError } from '../../../../../shared/core/UseCaseError'

export namespace IdentifierError {
   export class InvalidIdentifierError extends Result<UseCaseError> {
      constructor() {
         super(false, {
            message: 'Invalid identifier',
         } as UseCaseError)
      }
   }
}
