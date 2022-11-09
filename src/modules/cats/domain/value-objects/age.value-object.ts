import { IsInt, IsPositive, validateSync } from 'class-validator'
import { Result } from '../../../../shared/core/Result'
import { MAX_AGE } from '../cat.entity'

export class Age {
   @IsInt()
   @IsPositive()
   value: number

   private constructor(value: number) {
      this.value = value
   }

   public static create(value: number): Result<Age> {
      const age = new Age(value)

      const errors = validateSync(age)

      if (errors.length > 0) return Result.fail<Age>('Invalid age')
      if (age.value > MAX_AGE) return Result.fail<Age>('Too old cat')

      return Result.ok<Age>(age)
   }
}
