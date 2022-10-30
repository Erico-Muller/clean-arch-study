import { HaveABirthdayCatUseCase } from './have-a-birthday-cat.use-case'
import { CreateCatUseCase } from '../create-cat/create-cat.use-case'
import { CatInMemoryRepository } from '../../infra/db/in-memory/cat-in-memory.repository'

describe('HaveABithdayCat Use Case Tests', () => {
   it('Should be able to increment the age of a specific cat', async () => {
      const repository = new CatInMemoryRepository()
      const haveABirthdayUseCase = new HaveABirthdayCatUseCase(repository)
      const createUseCase = new CreateCatUseCase(repository)

      await createUseCase.execute({
         name: 'Cat',
         age: 2,
         breed: 'Siamese',
      })

      expect(repository.items).toHaveLength(1)

      await haveABirthdayUseCase.execute({ id: repository.items[0].id })

      expect(repository.items[0].age).toBe(3)
   })

   it('Should not be able to increment the age of a specific cat, throwing "Too old cat"', async () => {
      const repository = new CatInMemoryRepository()
      const haveABirthdayUseCase = new HaveABirthdayCatUseCase(repository)
      const createUseCase = new CreateCatUseCase(repository)

      await createUseCase.execute({
         name: 'Cat',
         age: 25,
         breed: 'Siamese',
      })

      expect(repository.items).toHaveLength(1)

      expect(() =>
         haveABirthdayUseCase.execute({
            id: repository.items[0].id,
         }),
      ).rejects.toThrowError('Too old cat')
   })

   it('Should not be able to increment the age of a specific cat, throwing "Cat not found"', async () => {
      const repository = new CatInMemoryRepository()
      const haveABirthdayUseCase = new HaveABirthdayCatUseCase(repository)

      expect(() =>
         haveABirthdayUseCase.execute({
            id: '00000000-0000-0000-0000-000000000000',
         }),
      ).rejects.toThrowError('Cat not found')
   })
})
