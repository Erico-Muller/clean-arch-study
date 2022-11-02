import { IsInt, IsString, Length } from 'class-validator'

export class CreateCatDto {
   @IsString()
   @Length(2, 30)
   name: string

   @IsInt()
   age: number

   @IsString()
   @Length(2, 30)
   breed: string
}
