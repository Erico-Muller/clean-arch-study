import { Cat, CatProps } from '../../../domain/cat.entity'
import { CatInMemoryRepository } from './cat-in-memory.repository'

const defaultCatProps: CatProps = {
   name: 'Cat',
   age: 2,
   breed: 'Siamese',
}

describe('CatInMemoryRepository Tests', () => {
   it('Should be able to return the number of registered cats', async () => {
      const repository = new CatInMemoryRepository()

      const cat = Cat.create(defaultCatProps).value.getValue()
      await repository.insert(cat)

      const length = await repository.length()

      expect(length).toEqual(1)
   })

   it('Should be able to identify if a cat is already registered', async () => {
      const repository = new CatInMemoryRepository()

      const cat = Cat.create(defaultCatProps).value.getValue()
      await repository.insert(cat)

      const catExists = await repository.exists(cat.id)

      expect(catExists).toBeTruthy()
   })

   it('Should be able to identify if a cat is not already registered', async () => {
      const repository = new CatInMemoryRepository()

      const catExists = await repository.exists(
         '00000000-0000-0000-0000-000000000000',
      )

      expect(catExists).toBeFalsy()
   })

   it('Should be able to insert a new cat', async () => {
      const repository = new CatInMemoryRepository()

      const cat = Cat.create(defaultCatProps).value.getValue()
      await repository.insert(cat)

      expect(repository.items).toHaveLength(1)
      expect(repository.items).toStrictEqual([cat])
   })

   it('Should not be able to insert a new cat, throwing "This cat already exists"', async () => {
      const repository = new CatInMemoryRepository()

      const cat = Cat.create(defaultCatProps).value.getValue()
      await repository.insert(cat)

      expect(repository.insert(cat)).rejects.toThrowError(
         'This cat already exists',
      )
   })

   it('Should able to list all the cats', async () => {
      const repository = new CatInMemoryRepository()

      const cat = Cat.create(defaultCatProps).value.getValue()
      await repository.insert(cat)

      const cats = await repository.findAll()

      expect(cats).toHaveLength(1)
      expect(cats).toStrictEqual([cat])
   })

   it('Should be able to find one cat', async () => {
      const repository = new CatInMemoryRepository()

      const cat = Cat.create(defaultCatProps).value.getValue()
      await repository.insert(cat)

      const foundCat = await repository.findOne(repository.items[0].id)

      expect(foundCat.name).toBe('Cat')
   })

   it('Should not be able to find one cat, throwing "Cat not found"', async () => {
      const repository = new CatInMemoryRepository()

      expect(() =>
         repository.findOne('00000000-0000-0000-0000-000000000000'),
      ).rejects.toThrowError('Cat not found')
   })

   it('Should be able to increment the age of a cat', async () => {
      const repository = new CatInMemoryRepository()

      const cat = Cat.create(defaultCatProps).value.getValue()
      await repository.insert(cat)

      expect(repository.items).toHaveLength(1)
      expect(repository.items).toStrictEqual([cat])

      await repository.incrementAge(cat.id)

      expect(repository.items[0].age).toStrictEqual(3)
   })

   it('Should not be able to increment the age of a cat, throwing "Cat not found"', async () => {
      const repository = new CatInMemoryRepository()

      expect(() =>
         repository.incrementAge('00000000-0000-0000-0000-000000000000'),
      ).rejects.toThrowError('Cat not found')
   })

   it('Should be able to delete a cat', async () => {
      const repository = new CatInMemoryRepository()

      const cat = Cat.create(defaultCatProps).value.getValue()
      await repository.insert(cat)

      expect(repository.items).toHaveLength(1)
      expect(repository.items).toStrictEqual([cat])

      await repository.delete(repository.items[0].id)

      expect(repository.items).toHaveLength(0)
      expect(repository.items).toStrictEqual([])
   })

   it('Should not be able to delete a cat, throwing "Cat not found"', async () => {
      const repository = new CatInMemoryRepository()

      expect(() =>
         repository.delete('00000000-0000-0000-0000-000000000000'),
      ).rejects.toThrowError('Cat not found')
   })

   it('Should be able to clear all the data', async () => {
      const repository = new CatInMemoryRepository()

      const cat = Cat.create(defaultCatProps).value.getValue()
      await repository.insert(cat)

      expect(repository.items).toHaveLength(1)

      await repository.clear()

      expect(repository.items).toHaveLength(0)
   })
})
