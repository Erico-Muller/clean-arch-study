import { IsInt, IsPositive, validateSync } from 'class-validator'

export class Age {
   @IsInt()
   @IsPositive()
   value: number

   constructor(value: number) {
      this.value = value
      const errors = validateSync(this)
      if (errors.length > 0) throw new Error('Invalid age')
   }
}
