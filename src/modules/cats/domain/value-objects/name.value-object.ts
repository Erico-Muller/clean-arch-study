import { Length, validateSync } from 'class-validator'

export class Name {
   @Length(2, 30)
   value: string

   constructor(value: string) {
      this.value = value
      const errors = validateSync(this)
      if (errors.length > 0) throw new Error('Invalid name')
   }
}
