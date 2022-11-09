import { Result } from '../../../../shared/core/Result'
import { UseCaseError } from '../../../../shared/core/UseCaseError'

export namespace HaveABirthdayCatErrors {
   export class CatNotFoundError extends Result<UseCaseError> {
      constructor() {
         super(false, {
            message: `Cat not found`,
         } as UseCaseError)
      }
   }

   export class TooOldCatError extends Result<UseCaseError> {
      constructor() {
         super(false, {
            message: `Too old cat`,
         } as UseCaseError)
      }
   }
}
