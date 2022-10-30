import { CreateCatUseCase } from './create-cat.use-case'
import { CatInMemoryRepository } from '../../infra/db/in-memory/cat-in-memory.repository'

describe('CreateCat Use Case Tests', () => {
   it('Should be able to create a new cat', async () => {
      const repository = new CatInMemoryRepository()
      const createUseCase = new CreateCatUseCase(repository)

      const output = await createUseCase.execute({
         name: 'Cat',
         age: 2,
         breed: 'Siamese',
      })

      expect(repository.items).toHaveLength(1)
      expect(output).toStrictEqual({
         id: repository.items[0].id,
         name: 'Cat',
         age: 2,
         breed: 'Siamese',
      })
   })

   it('Should not be able to create a new cat, throwing "Too old cat"', async () => {
      const repository = new CatInMemoryRepository()
      const createUseCase = new CreateCatUseCase(repository)

      expect(() =>
         createUseCase.execute({ name: 'Cat', age: 26, breed: 'Siamese' }),
      ).rejects.toThrowError('Too old cat')
   })

   it('Should not be able to create a new cat, throwing "Invalid age"', async () => {
      const repository = new CatInMemoryRepository()
      const createUseCase = new CreateCatUseCase(repository)

      expect(() =>
         createUseCase.execute({ name: 'Cat', age: -1, breed: 'Siamese' }),
      ).rejects.toThrowError('Invalid age')
   })
})
