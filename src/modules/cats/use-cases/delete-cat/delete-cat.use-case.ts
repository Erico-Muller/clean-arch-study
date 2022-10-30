import { CatRepository } from '../../repository/cat.repository.interface'
import { UseCase } from '../../../../shared/core/UseCase'

export class DeleteCatUseCase
   implements UseCase<DeleteCatInput, Promise<void>>
{
   constructor(private readonly catRepo: CatRepository) {}

   async execute(input: DeleteCatInput): Promise<void> {
      await this.catRepo.delete(input.id)
   }
}

export interface DeleteCatInput {
   id: string
}
