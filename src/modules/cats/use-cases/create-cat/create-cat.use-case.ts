import { Cat } from '../../domain/cat.entity'
import { CatRepository } from '../../repository/cat.repository.interface'
import { UseCase } from '../../../../shared/core/UseCase'

export class CreateCatUseCase
   implements UseCase<CreateCatInput, Promise<CreateCatOutput>>
{
   constructor(private readonly catRepo: CatRepository) {}

   async execute(input: CreateCatInput): Promise<CreateCatOutput> {
      const cat = Cat.create(input)
      this.catRepo.insert(cat)
      return cat.toObject()
   }
}

export interface CreateCatInput {
   name: string
   age: number
   breed: string
}

export interface CreateCatOutput extends CreateCatInput {
   id: string
}
