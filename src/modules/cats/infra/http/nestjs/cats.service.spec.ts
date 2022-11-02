import { Test, TestingModule } from '@nestjs/testing'
import { CatService } from './cats.service'

describe('CatsService', () => {
   let service: CatService

   beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
         providers: [CatService],
      }).compile()

      service = module.get<CatService>(CatService)
   })

   it('should be defined', () => {
      expect(service).toBeDefined()
   })
})