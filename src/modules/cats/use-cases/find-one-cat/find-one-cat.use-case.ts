import type { Cat } from '../../domain/cat.entity'

import type { CatRepository } from '../../repository/cat.repository.interface'
import type { UseCase } from '../../../../shared/core/UseCase'

import { Result, left, right } from '../../../../shared/core/Result'
import { FindOneCatError } from './find-one-cat.error'
import { AppError } from '../../../../shared/core/AppError'
import type { CatObject } from './find-one-cat.response'

import type { FindOneCatDTO } from './find-one-cat.dto'
import type { FindOneCatResponse } from './find-one-cat.response'

export class FindOneCatUseCase
   implements UseCase<FindOneCatDTO, Promise<FindOneCatResponse>>
{
   constructor(private readonly catRepo: CatRepository) {}

   async execute(input: FindOneCatDTO): Promise<FindOneCatResponse> {
      try {
         let foundCat: Cat

         try {
            foundCat = await this.catRepo.findOne(input.id)
         } catch (err) {
            return left(
               new FindOneCatError.CatNotFoundError(),
            ) as FindOneCatResponse
         }

         return right(Result.ok<CatObject>(foundCat.toObject()))
      } catch (err) {
         return left(new AppError.UnexpectedError(err)) as FindOneCatResponse
      }
   }
}
