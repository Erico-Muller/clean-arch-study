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

      const result = await haveABirthdayUseCase.execute({
         id: repository.items[0].id,
      })

      expect(result.isRight).toBeTruthy()
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

      const result = await haveABirthdayUseCase.execute({
         id: repository.items[0].id,
      })

      expect(result.value.getErrorValue().message).toBe('Too old cat')
   })

   it('Should not be able to increment the age of a specific cat, throwing "Cat not found"', async () => {
      const repository = new CatInMemoryRepository()
      const haveABirthdayUseCase = new HaveABirthdayCatUseCase(repository)

      const result = await haveABirthdayUseCase.execute({
         id: '00000000-0000-0000-0000-000000000000',
      })

      expect(result.value.getErrorValue().message).toBe('Cat not found')
   })
})
