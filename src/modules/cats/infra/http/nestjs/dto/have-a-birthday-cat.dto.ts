import { IsUUID } from 'class-validator'

export class HaveABirthdayCatDto {
   @IsUUID(4)
   id: string
}
