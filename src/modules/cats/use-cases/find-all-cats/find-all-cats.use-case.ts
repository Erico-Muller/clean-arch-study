import { CatRepository } from '../../repository/cat.repository.interface'
import { UseCase } from '../../../../shared/core/UseCase'

export class FindAllCatsUseCase
   implements UseCase<void, Promise<FindAllCatsOutput>>
{
   constructor(private readonly catRepo: CatRepository) {}

   async execute(): Promise<FindAllCatsOutput> {
      const cats = await this.catRepo.findAll()
      return cats.map(cat => cat.toObject())
   }
}

export type FindAllCatsOutput = {
   id: string
   name: string
   age: number
   breed: string
}[]
