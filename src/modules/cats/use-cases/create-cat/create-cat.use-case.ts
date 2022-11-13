import { Cat } from '../../domain/cat.entity'
import type { CatRepository } from '../../repository/cat.repository.interface'
import type { UseCase } from '../../../../shared/core/UseCase'

import { Result, left, right } from '../../../../shared/core/Result'
import { AppError } from '../../../../shared/core/AppError'

import type { CreateCatDTO } from './create-cat.dto'
import type { CreateCatResponse } from './create-cat.response'

export class CreateCatUseCase
   implements UseCase<CreateCatDTO, Promise<CreateCatResponse>>
{
   constructor(private readonly catRepo: CatRepository) {}

   async execute(input: CreateCatDTO): Promise<CreateCatResponse> {
      try {
         const catOrError = Cat.create(input)

         if (!catOrError.isRight()) {
            return left(catOrError.value) as CreateCatResponse
         }

         this.catRepo.insert(catOrError.value.getValue())
         return right(Result.ok<void>())
      } catch (err) {
         return left(new AppError.UnexpectedError(err)) as CreateCatResponse
      }
   }
}
