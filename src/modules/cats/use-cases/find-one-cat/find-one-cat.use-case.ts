import { CatRepository } from '../../repository/cat.repository.interface'
import { UseCase } from '../../../../shared/core/UseCase'

export class FindOneCatUseCase
   implements UseCase<FindOneCatInput, Promise<FindOneCatOutput>>
{
   constructor(private readonly catRepo: CatRepository) {}

   async execute(input: FindOneCatInput): Promise<FindOneCatOutput> {
      const foundCat = await this.catRepo.findOne(input.id)

      if (!foundCat) throw new Error('Cat not found')

      return foundCat.toObject()
   }
}

export interface FindOneCatInput {
   id: string
}

export interface FindOneCatOutput {
   id: string
   name: string
   age: number
   breed: string
}
