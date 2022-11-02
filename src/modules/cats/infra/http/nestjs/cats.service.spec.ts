import { Test, TestingModule } from '@nestjs/testing'

import { CatService } from './cats.service'

import { CatRepository } from '../../../repository/cat.repository.interface'
import { CatInMemoryRepository } from '../../db/in-memory/cat-in-memory.repository'

import {
   CreateCatUseCase,
   FindAllCatsUseCase,
   FindOneCatUseCase,
   HaveABirthdayCatUseCase,
   DeleteCatUseCase,
} from '../../../use-cases'

describe('CatsService', () => {
   let service: CatService

   beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
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

      service = module.get<CatService>(CatService)
   })

   it('should be defined', () => {
      expect(service).toBeDefined()
   })
})
