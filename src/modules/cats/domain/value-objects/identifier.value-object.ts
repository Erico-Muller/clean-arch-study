import { IsUUID, validateSync } from 'class-validator'
import { Result } from '../../../../shared/core/Result'

export class Identifier {
   @IsUUID(4)
   value: string

   private constructor(value: string) {
      this.value = value
   }

   public static create(value: string): Result<Identifier> {
      const identifier = new Identifier(value)

      const errors = validateSync(identifier)
      if (errors.length > 0)
         return Result.fail<Identifier>('Invalid identifier')

      return Result.ok<Identifier>(identifier)
   }
}
