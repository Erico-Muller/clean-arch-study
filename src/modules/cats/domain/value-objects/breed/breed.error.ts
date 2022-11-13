import { Result } from '../../../../../shared/core/Result'
import { UseCaseError } from '../../../../../shared/core/UseCaseError'

export namespace BreedError {
   export class InvalidBreedError extends Result<UseCaseError> {
      constructor() {
         super(false, {
            message: 'Invalid breed',
         } as UseCaseError)
      }
   }

   export class TooLongBreedError extends Result<UseCaseError> {
      constructor() {
         super(false, {
            message: 'Too long breed, max 30 characters',
         } as UseCaseError)
      }
   }

   export class TooShortBreedError extends Result<UseCaseError> {
      constructor() {
         super(false, {
            message: 'Too short breed, min 3 characters',
         } as UseCaseError)
      }
   }
}
