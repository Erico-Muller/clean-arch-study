import { IsUUID } from 'class-validator'

export class DeleteCatDto {
   @IsUUID(4)
   id: string
}
