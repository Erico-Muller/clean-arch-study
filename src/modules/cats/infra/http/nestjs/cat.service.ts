import { Injectable } from '@nestjs/common'

import {
   CreateCatUseCase,
   FindAllCatsUseCase,
   FindOneCatUseCase,
   HaveABirthdayCatUseCase,
   DeleteCatUseCase,
} from '../../../use-cases'

import {
   CreateCatDto,
   FindOneCatDto,
   HaveABirthdayCatDto,
   DeleteCatDto,
} from './dto'

import type {
   CreateCatResponse,
   FindAllCatsResponse,
   FindOneCatResponse,
   HaveABirthdayCatResponse,
   DeleteCatResponse,
} from '../../../use-cases'

@Injectable()
export class CatService {
   constructor(
      private readonly createCat: CreateCatUseCase,
      private readonly findAllCats: FindAllCatsUseCase,
      private readonly findOneCat: FindOneCatUseCase,
      private readonly haveABirthdayCat: HaveABirthdayCatUseCase,
      private readonly deleteCat: DeleteCatUseCase,
   ) {}

   async create(createCatDto: CreateCatDto): Promise<CreateCatResponse> {
      return await this.createCat.execute(createCatDto)
   }

   async findAll(): Promise<FindAllCatsResponse> {
      return await this.findAllCats.execute()
   }

   async findOne(id: FindOneCatDto): Promise<FindOneCatResponse> {
      return await this.findOneCat.execute(id)
   }

   async haveABirthday(
      id: HaveABirthdayCatDto,
   ): Promise<HaveABirthdayCatResponse> {
      return await this.haveABirthdayCat.execute(id)
   }

   async delete(id: DeleteCatDto): Promise<DeleteCatResponse> {
      return await this.deleteCat.execute(id)
   }
}
