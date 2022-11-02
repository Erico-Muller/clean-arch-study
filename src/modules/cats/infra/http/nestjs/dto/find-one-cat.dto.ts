import { IsUUID } from 'class-validator'

export class FindOneCatDto {
   @IsUUID(4)
   id: string
}
