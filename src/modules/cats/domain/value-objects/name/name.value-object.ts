import { Result, left, right } from '../../../../../shared/core/Result'
import { NameResponse } from './name.response'
import { NameError } from './name.error'

export class Name {
   private constructor(public value: string) {}

   public static create(value: string): NameResponse {
      try {
         const name = new Name(value)

         if (name.value.length > 30)
            return left(new NameError.TooLongNameError())
         if (name.value.length < 2)
            return left(new NameError.TooShortNameError())

         return right(Result.ok<Name>(name))
      } catch {
         return left(new NameError.InvalidNameError())
      }
   }
}
