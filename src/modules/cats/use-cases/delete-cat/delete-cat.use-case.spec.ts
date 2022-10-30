import { DeleteCatUseCase } from './delete-cat.use-case'
import { CreateCatUseCase } from '../create-cat/create-cat.use-case'
import { CatInMemoryRepository } from '../../infra/db/in-memory/cat-in-memory.repository'

describe('DeleteCat Use Case Tests', () => {
   it('Should be able to delete one specific cat', async () => {
      const repository = new CatInMemoryRepository()
      const deleteUseCase = new DeleteCatUseCase(repository)
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

      expect(repository.items).toHaveLength(2)

      await deleteUseCase.execute({ id: repository.items[0].id })

      const items = repository.items.map(item => item.toObject())
      expect(items).toHaveLength(1)
      expect(items).toStrictEqual([
         {
            id: repository.items[0].id,
            name: 'Cat2',
            age: 3,
            breed: 'Siamese',
         },
      ])
   })

   it('Should not be able to delete one specific cat, throwing "Cat not found"', async () => {
      const repository = new CatInMemoryRepository()
      const deleteUseCase = new DeleteCatUseCase(repository)

      expect(() =>
         deleteUseCase.execute({ id: '00000000-0000-0000-0000-000000000000' }),
      ).rejects.toThrowError('Cat not found')
   })
})
