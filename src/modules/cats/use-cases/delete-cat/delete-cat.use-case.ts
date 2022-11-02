import { CatRepository } from '../../repository/cat.repository.interface'
import { UseCase } from '../../../../shared/core/UseCase'

export class DeleteCatUseCase
   implements UseCase<DeleteCatInput, Promise<void>>
{
   constructor(private readonly catRepo: CatRepository) {}

   async execute(input: DeleteCatInput): Promise<void> {
      try {
         await this.catRepo.delete(input.id)
      } catch (err) {
         throw new Error(err)
      }
   }
}

export interface DeleteCatInput {
   id: string
}
