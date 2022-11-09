import { Length, validateSync } from 'class-validator'
import { Result } from '../../../../shared/core/Result'

export class Name {
   @Length(2, 30)
   value: string

   private constructor(value: string) {
      this.value = value
   }

   public static create(value: string): Result<Name> {
      const name = new Name(value)

      const errors = validateSync(name)
      if (errors.length > 0) return Result.fail<Name>('Invalid name')

      return Result.ok<Name>(name)
   }
}
