import type { CatRepository } from '../../repository/cat.repository.interface'
import type { UseCase } from '../../../../shared/core/UseCase'

import { Result, left, right } from '../../../../shared/core/Result'
import { DeleteCatErrors } from './delete-cat.errors'
import { AppError } from '../../../../shared/core/AppError'

import type { DeleteCatDTO } from './delete-cat.dto'
import type { DeleteCatResponse } from './delete-cat.response'

export class DeleteCatUseCase
   implements UseCase<DeleteCatDTO, Promise<DeleteCatResponse>>
{
   constructor(private readonly catRepo: CatRepository) {}

   async execute(input: DeleteCatDTO): Promise<DeleteCatResponse> {
      try {
         try {
            await this.catRepo.delete(input.id)
         } catch (err) {
            return left(
               new DeleteCatErrors.CatNotFoundError(),
            ) as DeleteCatResponse
         }

         return right(Result.ok<void>())
      } catch (err) {
         return left(new AppError.UnexpectedError(err)) as DeleteCatResponse
      }
   }
}
