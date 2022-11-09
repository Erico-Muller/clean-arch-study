import { CreateCatUseCase } from './create-cat.use-case'
import { CatInMemoryRepository } from '../../infra/db/in-memory/cat-in-memory.repository'

describe('CreateCat Use Case Tests', () => {
   it('Should be able to create a new cat', async () => {
      const repository = new CatInMemoryRepository()
      const createUseCase = new CreateCatUseCase(repository)

      const catOrError = await createUseCase.execute({
         name: 'Cat',
         age: 2,
         breed: 'Siamese',
      })

      expect(catOrError.isRight()).toBeTruthy()
   })

   it('Should not be able to create a new cat', async () => {
      const repository = new CatInMemoryRepository()
      const createUseCase = new CreateCatUseCase(repository)

      const catOrError = await createUseCase.execute({
         name: 'Cat',
         age: 26,
         breed: 'Siamese',
      })

      expect(catOrError.isLeft()).toBeTruthy()
   })

   it('Should not be able to create a new cat', async () => {
      const repository = new CatInMemoryRepository()
      const createUseCase = new CreateCatUseCase(repository)

      const catOrError = await createUseCase.execute({
         name: 'Cat',
         age: -1,
         breed: 'Siamese',
      })

      expect(catOrError.isLeft()).toBeTruthy()
   })
})
