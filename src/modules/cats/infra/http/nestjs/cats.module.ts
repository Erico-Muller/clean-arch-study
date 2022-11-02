import { Module } from '@nestjs/common'

import { CatController } from './cats.controller'
import { CatService } from './cats.service'

import { CatRepository } from '../../../repository/cat.repository.interface'
import { CatPrismaRepository } from '../../db/prisma/cat-prisma.repository'

import {
   CreateCatUseCase,
   FindAllCatsUseCase,
   FindOneCatUseCase,
   HaveABirthdayCatUseCase,
   DeleteCatUseCase,
} from '../../../use-cases'

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
         inject: [CatPrismaRepository],
      },
      {
         provide: FindAllCatsUseCase,
         useFactory: (catRepository: CatRepository) => {
            return new FindAllCatsUseCase(catRepository)
         },
         inject: [CatPrismaRepository],
      },
      {
         provide: FindOneCatUseCase,
         useFactory: (catRepository: CatRepository) => {
            return new FindOneCatUseCase(catRepository)
         },
         inject: [CatPrismaRepository],
      },
      {
         provide: HaveABirthdayCatUseCase,
         useFactory: (catRepository: CatRepository) => {
            return new HaveABirthdayCatUseCase(catRepository)
         },
         inject: [CatPrismaRepository],
      },
      {
         provide: DeleteCatUseCase,
         useFactory: (catRepository: CatRepository) => {
            return new DeleteCatUseCase(catRepository)
         },
         inject: [CatPrismaRepository],
      },
   ],
})
export class CatModule {}
