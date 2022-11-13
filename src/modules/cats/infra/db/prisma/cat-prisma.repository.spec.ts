import { Cat, CatProps } from '../../../domain/cat.entity'
import { CatPrismaRepository } from './cat-prisma.repository'

const defaultCatProps: CatProps = {
   name: 'Cat',
   age: 2,
   breed: 'Siamese',
}

describe('CatPrismaRepository Tests', () => {
   beforeEach(async () => {
      const repository = new CatPrismaRepository()
      await repository.clear()
   })

   it('Should be able to return the number of registered cats', async () => {
      const repository = new CatPrismaRepository()

      const cat = Cat.create(defaultCatProps).value.getValue()
      await repository.insert(cat)

      const length = await repository.length()

      expect(length).toEqual(1)
   })

   it('Should be able to identify if a cat is already registered', async () => {
      const repository = new CatPrismaRepository()

      const cat = Cat.create(defaultCatProps).value.getValue()
      await repository.insert(cat)

      const catExists = await repository.exists(cat.id)

      expect(catExists).toBeTruthy()
   })

   it('Should be able to identify if a cat is not already registered', async () => {
      const repository = new CatPrismaRepository()

      const catExists = await repository.exists(
         '00000000-0000-0000-0000-000000000000',
      )

      expect(catExists).toBeFalsy()
   })

   it('Should be able to insert a new cat', async () => {
      const repository = new CatPrismaRepository()

      const cat = Cat.create(defaultCatProps).value.getValue()
      await repository.insert(cat)

      const length = await repository.length()
      const cats = await repository.findAll()

      expect(length).toBe(1)
      expect(cats).toStrictEqual([cat])
   })

   it('Should not be able to insert a new cat, throwing "This cat already exists"', async () => {
      const repository = new CatPrismaRepository()

      const cat = Cat.create(defaultCatProps).value.getValue()
      await repository.insert(cat)

      expect(repository.insert(cat)).rejects.toThrowError(
         'This cat already exists',
      )
   })

   it('Should able to list all the cats', async () => {
      const repository = new CatPrismaRepository()

      const cat = Cat.create(defaultCatProps).value.getValue()
      await repository.insert(cat)

      const cats = await repository.findAll()

      expect(cats).toHaveLength(1)
      expect(cats).toStrictEqual([cat])
   })

   it('Should be able to find one cat', async () => {
      const repository = new CatPrismaRepository()

      const cat = Cat.create(defaultCatProps).value.getValue()
      await repository.insert(cat)

      const foundCat = await repository.findOne(cat.id)

      expect(foundCat.name).toBe('Cat')
   })

   it('Should not be able to find one cat', async () => {
      const repository = new CatPrismaRepository()

      expect(
         repository.findOne('00000000-0000-0000-0000-000000000000'),
      ).rejects.toThrowError('Cat not found')
   })

   it('Should be able to increment the age of a cat', async () => {
      const repository = new CatPrismaRepository()

      const cat = Cat.create(defaultCatProps).value.getValue()
      await repository.insert(cat)

      const length = await repository.length()
      expect(length).toBe(1)

      await repository.incrementAge(cat.id)

      const foundCat = await repository.findOne(cat.id)
      expect(foundCat.age).toBe(3)
   })

   it('Should not be able to increment the age of a cat, throwing "Cat not found"', async () => {
      const repository = new CatPrismaRepository()

      expect(() =>
         repository.incrementAge('00000000-0000-0000-0000-000000000000'),
      ).rejects.toThrowError('Cat not found')
   })

   it('Should be able to delete a cat', async () => {
      const repository = new CatPrismaRepository()

      const cat = Cat.create(defaultCatProps).value.getValue()
      await repository.insert(cat)

      const length = await repository.length()
      expect(length).toBe(1)

      await repository.delete(cat.id)

      const newLength = await repository.length()
      expect(newLength).toBe(0)
   })

   it('Should not be able to delete a cat, throwing "Cat not found"', async () => {
      const repository = new CatPrismaRepository()

      expect(() =>
         repository.delete('00000000-0000-0000-0000-000000000000'),
      ).rejects.toThrowError('Cat not found')
   })

   it('Should be able to clear all the data', async () => {
      const repository = new CatPrismaRepository()

      const cat = Cat.create(defaultCatProps).value.getValue()
      await repository.insert(cat)

      const length = await repository.length()
      expect(length).toBe(1)

      await repository.clear()

      const newLength = await repository.length()
      expect(newLength).toBe(0)
   })
})
