import { IsInt, IsPositive, IsString, Length, Max } from 'class-validator'

export class CreateCatDto {
   @IsString()
   @Length(2, 30)
   name: string

   @IsInt()
   @IsPositive()
   @Max(25)
   age: number

   @IsString()
   @Length(2, 30)
   breed: string
}
