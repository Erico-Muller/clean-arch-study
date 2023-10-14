import { Module } from '@nestjs/common'

import { CatController } from './cat.controller'
import { CatService } from './cat.service'

import { CatRepository } from '../../../repository/cat.repository.interface'
import { CatPrismaRepository } from '../../db/prisma/cat-prisma.repository'

import {
   CreateCatUseCase,
   FindAllCatsUseCase,
   FindOneCatUseCase,
   HaveABirthdayCatUseCase,
   DeleteCatUseCase,
} from '../../../use-cases'

const currentRepository = CatPrismaRepository

@Module({
   controllers: [CatController],
   providers: [
      CatService,
      {
         provide: CatPrismaRepository,
         useClass: CatPrismaRepository,
      },
      {
         provide: CreateCatUseCase,
         useFactory: (catRepository: CatRepository) => {
            return new CreateCatUseCase(catRepository)
         },
         inject: [currentRepository],
      },
      {
         provide: FindAllCatsUseCase,
         useFactory: (catRepository: CatRepository) => {
            return new FindAllCatsUseCase(catRepository)
         },
         inject: [currentRepository],
      },
      {
         provide: FindOneCatUseCase,
         useFactory: (catRepository: CatRepository) => {
            return new FindOneCatUseCase(catRepository)
         },
         inject: [currentRepository],
      },
      {
         provide: HaveABirthdayCatUseCase,
         useFactory: (catRepository: CatRepository) => {
            return new HaveABirthdayCatUseCase(catRepository)
         },
         inject: [currentRepository],
      },
      {
         provide: DeleteCatUseCase,
         useFactory: (catRepository: CatRepository) => {
            return new DeleteCatUseCase(catRepository)
         },
         inject: [currentRepository],
      },
   ],
})
export class CatModule {}
