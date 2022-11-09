import { Cat } from '../../domain/cat.entity'

import type { CatRepository } from '../../repository/cat.repository.interface'
import type { UseCase } from '../../../../shared/core/UseCase'

import { Result, left, right } from '../../../../shared/core/Result'
import { HaveABirthdayCatErrors } from './have-a-birthday-cat.errors'
import { AppError } from '../../../../shared/core/AppError'

import type { HaveABirthdayCatDTO } from './have-a-birthday-cat.dto'
import type { HaveABirthdayCatResponse } from './have-a-birthday-cat.response'

export class HaveABirthdayCatUseCase
   implements UseCase<HaveABirthdayCatDTO, Promise<HaveABirthdayCatResponse>>
{
   constructor(private readonly catRepo: CatRepository) {}

   async execute(
      input: HaveABirthdayCatDTO,
   ): Promise<HaveABirthdayCatResponse> {
      try {
         let foundCat: any
         try {
            foundCat = await this.catRepo.findOne(input.id)
         } catch (err) {
            return left(
               new HaveABirthdayCatErrors.CatNotFoundError(),
            ) as HaveABirthdayCatResponse
         }

         const catObj = foundCat.toObject()
         const cat = Cat.create(
            {
               name: catObj.name,
               age: catObj.age,
               breed: catObj.breed,
            },
            catObj.id,
         )

         const result = cat.getValue().haveABirthday()
         if (result && result.isFailure) {
            return left(
               new HaveABirthdayCatErrors.TooOldCatError(),
            ) as HaveABirthdayCatResponse
         }

         await this.catRepo.incrementAge(input.id)

         return right(Result.ok<void>())
      } catch (err) {
         return left(
            new AppError.UnexpectedError(err),
         ) as HaveABirthdayCatResponse
      }
   }
}
