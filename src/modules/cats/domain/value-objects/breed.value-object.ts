import { Length, validateSync } from 'class-validator'
import { Result } from '../../../../shared/core/Result'

export class Breed {
   @Length(3, 30)
   value: string

   private constructor(value: string) {
      this.value = value
   }

   public static create(value: string): Result<Breed> {
      const breed = new Breed(value)

      const errors = validateSync(breed)
      if (errors.length > 0) return Result.fail<Breed>('Invalid breed')

      return Result.ok<Breed>(breed)
   }
}
