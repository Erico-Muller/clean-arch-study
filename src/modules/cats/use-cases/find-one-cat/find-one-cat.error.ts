import { Result } from '../../../../shared/core/Result'
import { UseCaseError } from '../../../../shared/core/UseCaseError'

export namespace FindOneCatError {
   export class CatNotFoundError extends Result<UseCaseError> {
      constructor() {
         super(false, {
            message: `Cat not found`,
         } as UseCaseError)
      }
   }
}
