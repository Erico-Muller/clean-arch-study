import { Result } from '../../../../../shared/core/Result'
import { UseCaseError } from '../../../../../shared/core/UseCaseError'

export namespace NameError {
   export class InvalidNameError extends Result<UseCaseError> {
      constructor() {
         super(false, {
            message: 'Invalid name',
         } as UseCaseError)
      }
   }

   export class TooLongNameError extends Result<UseCaseError> {
      constructor() {
         super(false, {
            message: 'Too long name, max 30 characters',
         } as UseCaseError)
      }
   }

   export class TooShortNameError extends Result<UseCaseError> {
      constructor() {
         super(false, {
            message: 'Too short name, min 2 characters',
         } as UseCaseError)
      }
   }
}
