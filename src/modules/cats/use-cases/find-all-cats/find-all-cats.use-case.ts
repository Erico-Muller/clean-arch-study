import type { CatRepository } from '../../repository/cat.repository.interface'
import type { UseCase } from '../../../../shared/core/UseCase'

import { Result, left, right } from '../../../../shared/core/Result'
import { AppError } from '../../../../shared/core/AppError'
import type { CatsObject } from './find-all-cats.response'

import type { FindAllCatsResponse } from './find-all-cats.response'

export class FindAllCatsUseCase
   implements UseCase<void, Promise<FindAllCatsResponse>>
{
   constructor(private readonly catRepo: CatRepository) {}

   async execute(): Promise<FindAllCatsResponse> {
      try {
         const cats = await this.catRepo.findAll()
         const rawCats = cats.map(cat => cat.toObject())

         return right(Result.ok<CatsObject>(rawCats))
      } catch (err) {
         return left(new AppError.UnexpectedError(err)) as FindAllCatsResponse
      }
   }
}
