import { IsUUID, validateSync } from 'class-validator'

export class Identifier {
   @IsUUID(4)
   value: string

   constructor(value: string) {
      this.value = value
      const errors = validateSync(this)
      if (errors.length > 0) throw new Error('Invalid identifier')
   }
}
