import { Test, TestingModule } from '@nestjs/testing'
import { CatController } from './cats.controller'
import { CatService } from './cats.service'

describe('CatsController', () => {
   let controller: CatController

   beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
         controllers: [CatController],
         providers: [CatService],
      }).compile()

      controller = module.get<CatController>(CatController)
   })

   it('should be defined', () => {
      expect(controller).toBeDefined()
   })
})
