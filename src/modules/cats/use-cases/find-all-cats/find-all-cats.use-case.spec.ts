import { FindAllCatsUseCase } from './find-all-cats.use-case'
import { CreateCatUseCase } from '../create-cat/create-cat.use-case'
import { CatInMemoryRepository } from '../../infra/db/in-memory/cat-in-memory.repository'

describe('FindAllCats Use Case Tests', () => {
   it('Should be able to find all the cats', async () => {
      const repository = new CatInMemoryRepository()
      const findAllUseCase = new FindAllCatsUseCase(repository)
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

      const result = await findAllUseCase.execute()

      expect(result.isRight()).toBeTruthy()
   })
})
