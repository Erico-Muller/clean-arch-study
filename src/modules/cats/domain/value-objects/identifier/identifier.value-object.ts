import { IsUUID, validateSync } from 'class-validator'
import { Result, left, right } from '../../../../../shared/core/Result'

import { IdentifierResponse } from './identifier.response'
import { IdentifierError } from './identifier.error'

export class Identifier {
   @IsUUID(4)
   value: string

   private constructor(value: string) {
      this.value = value
   }

   public static create(value: string): IdentifierResponse {
      const identifier = new Identifier(value)

      const errors = validateSync(identifier)
      if (errors.length > 0)
         return left(new IdentifierError.InvalidIdentifierError())

      return right(Result.ok<Identifier>(identifier))
   }
}
