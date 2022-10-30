import { Cat } from '../../domain/cat.entity'
import { CatRepository } from '../../repository/cat.repository.interface'
import { UseCase } from '../../../../shared/core/UseCase'

export class HaveABirthdayCatUseCase
   implements UseCase<haveABirthdayCatInput, Promise<void>>
{
   constructor(private readonly catRepo: CatRepository) {}

   async execute(input: haveABirthdayCatInput): Promise<void> {
      const foundCat = await this.catRepo.findOne(input.id)
      if (!foundCat) throw new Error('Cat not found')

      const catObj = foundCat.toObject()
      const cat = Cat.create(
         {
            name: catObj.name,
            age: catObj.age,
            breed: catObj.breed,
         },
         catObj.id,
      )

      try {
         cat.haveABirthday()
         await this.catRepo.incrementAge(input.id)
      } catch (err) {
         throw err
      }
   }
}

export interface haveABirthdayCatInput {
   id: string
}
