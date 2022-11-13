import { Result } from '../../../../../shared/core/Result'
import { UseCaseError } from '../../../../../shared/core/UseCaseError'

export namespace AgeError {
   export class InvalidAgeError extends Result<UseCaseError> {
      constructor() {
         super(false, {
            message: 'Invalid age',
         } as UseCaseError)
      }
   }

   export class TooOldCatError extends Result<UseCaseError> {
      constructor() {
         super(false, {
            message: 'Too old cat',
         } as UseCaseError)
      }
   }
}
