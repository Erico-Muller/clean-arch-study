import { FindOneCatUseCase } from './find-one-cat.use-case'
import { CreateCatUseCase } from '../create-cat/create-cat.use-case'
import { CatInMemoryRepository } from '../../infra/db/in-memory/cat-in-memory.repository'

describe('FindOneCat Use Case Tests', () => {
   it('Should be able to find one specific cat', async () => {
      const repository = new CatInMemoryRepository()
      const findOneUseCase = new FindOneCatUseCase(repository)
      const createUseCase = new CreateCatUseCase(repository)

      await createUseCase.execute({
         name: 'Cat',
         age: 2,
         breed: 'Siamese',
      })

      await createUseCase.execute({
         name: 'Cat2',
         age: 3,
         breed: 'Siamese',
      })

      const foundCat = await findOneUseCase.execute({
         id: repository.items[1].id,
      })

      expect(foundCat.isRight).toBeTruthy()
      expect(foundCat.value.getValue().name).toBe('Cat2')
   })

   it('Should not be able to find one cat, throwing "Cat not found"', async () => {
      const repository = new CatInMemoryRepository()
      const findOneUseCase = new FindOneCatUseCase(repository)

      const result = await findOneUseCase.execute({
         id: '00000000-0000-0000-0000-000000000000',
      })

      expect(result.isLeft()).toBeTruthy()
   })
})
