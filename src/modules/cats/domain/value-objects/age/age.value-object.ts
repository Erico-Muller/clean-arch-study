import { IsInt, IsPositive, validateSync } from 'class-validator'
import { MAX_AGE } from '../../cat.entity'

import { Result, left, right } from '../../../../../shared/core/Result'
import { AgeResponse } from './age.response'
import { AgeError } from './age.error'

export class Age {
   @IsInt()
   @IsPositive()
   value: number

   private constructor(value: number) {
      this.value = value
   }

   public static create(value: number): AgeResponse {
      const age = new Age(value)

      const errors = validateSync(age)

      if (errors.length > 0) return left(new AgeError.InvalidAgeError())
      if (age.value > MAX_AGE) return left(new AgeError.TooOldCatError())

      return right(Result.ok<Age>(age))
   }
}
