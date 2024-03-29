import { Test, TestingModule } from '@nestjs/testing'

import { CatController } from './cat.controller'
import { CatService } from './cat.service'

import { CatRepository } from '../../../repository/cat.repository.interface'
import { CatInMemoryRepository } from '../../db/in-memory/cat-in-memory.repository'

import {
   CreateCatUseCase,
   FindAllCatsUseCase,
   FindOneCatUseCase,
   HaveABirthdayCatUseCase,
   DeleteCatUseCase,
} from '../../../use-cases'

const defaultCatProps = {
   name: 'Cat',
   age: 2,
   breed: 'Siamese',
}

describe('CatsController', () => {
   let controller: CatController
   let service: CatService

   beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
         controllers: [CatController],
         providers: [
            CatService,
            {
               provide: CatInMemoryRepository,
               useClass: CatInMemoryRepository,
            },
            {
               provide: CreateCatUseCase,
               useFactory: (catRepository: CatRepository) => {
                  return new CreateCatUseCase(catRepository)
               },
               inject: [CatInMemoryRepository],
            },
            {
               provide: FindAllCatsUseCase,
               useFactory: (catRepository: CatRepository) => {
                  return new FindAllCatsUseCase(catRepository)
               },
               inject: [CatInMemoryRepository],
            },
            {
               provide: FindOneCatUseCase,
               useFactory: (catRepository: CatRepository) => {
                  return new FindOneCatUseCase(catRepository)
               },
               inject: [CatInMemoryRepository],
            },
            {
               provide: HaveABirthdayCatUseCase,
               useFactory: (catRepository: CatRepository) => {
                  return new HaveABirthdayCatUseCase(catRepository)
               },
               inject: [CatInMemoryRepository],
            },
            {
               provide: DeleteCatUseCase,
               useFactory: (catRepository: CatRepository) => {
                  return new DeleteCatUseCase(catRepository)
               },
               inject: [CatInMemoryRepository],
            },
         ],
      }).compile()

      controller = module.get<CatController>(CatController)
      service = module.get<CatService>(CatService)
   })

   it('Should be defined', () => {
      expect(controller).toBeDefined()
   })

   it('Should be able create a new cat', async () => {
      await controller.create(defaultCatProps)

      const cats = await controller.findAll()

      expect(cats).toHaveLength(1)
   })
})
