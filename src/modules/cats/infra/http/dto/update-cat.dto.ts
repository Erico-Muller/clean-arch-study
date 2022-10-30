import { IsInt } from 'class-validator'

export class UpdateCatDto {
   @IsInt()
   age: number
}
