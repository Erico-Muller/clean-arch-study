// import { Cat, CatProps } from '../../../domain/cat.entity'
// import { CatMikroOrmRepository } from './cat-mikro-orm.repository'

// const defaultCatProps: CatProps = {
//    name: 'Cat',
//    age: 2,
//    breed: 'Siamese',
// }

// describe('CatMikroOrmRepository Tests', () => {
//    it('Should be able to insert a new cat', async () => {
//       const repository = new CatMikroOrmRepository()

//       const cat = Cat.create(defaultCatProps)
//       await repository.insert(cat)

//       console.log(await repository.lenght())
//    })

//    it('Should able to list all the cats', async () => {
//       const repository = new CatMikroOrmRepository()

//       const cat = Cat.create(defaultCatProps)
//       await repository.insert(cat)

//       const cats = await repository.findAll()

//       expect(cats).toHaveLength(1)
//       expect(cats).toStrictEqual([cat])
//    })

//    it('Should be able to find one cat', async () => {
//       const repository = new CatMikroOrmRepository()

//       const cat = Cat.create(defaultCatProps)
//       await repository.insert(cat)

//       const sut = await repository.findOne(repository.items[0].id)

//       expect(sut.name).toBe('Cat')
//    })

//    it('Should return null trying to find one cat', async () => {
//       const repository = new CatMikroOrmRepository()

//       const cat = await repository.findOne(
//          '00000000-0000-0000-0000-000000000000',
//       )

//       expect(cat).toBeNull()
//    })

//    it('Should be able to increment the age of a cat', async () => {
//       const repository = new CatMikroOrmRepository()

//       const cat = Cat.create(defaultCatProps)
//       await repository.insert(cat)

//       expect(repository.items).toHaveLength(1)
//       expect(repository.items).toStrictEqual([cat])

//       await repository.incrementAge(cat.id)

//       expect(repository.items[0].age).toStrictEqual(3)
//    })

//    it('Should not be able to increment the age of a cat, throwing "Cat not found"', async () => {
//       const repository = new CatMikroOrmRepository()

//       expect(() =>
//          repository.incrementAge('00000000-0000-0000-0000-000000000000'),
//       ).rejects.toThrowError('Cat not found')
//    })

//    it('Should be able to delete a cat', async () => {
//       const repository = new CatMikroOrmRepository()

//       const cat = Cat.create(defaultCatProps)
//       await repository.insert(cat)

//       expect(repository.items).toHaveLength(1)
//       expect(repository.items).toStrictEqual([cat])

//       await repository.delete(repository.items[0].id)

//       expect(repository.items).toHaveLength(0)
//       expect(repository.items).toStrictEqual([])
//    })

//    it('Should not be able to delete a cat, throwing "Cat not found"', async () => {
//       const repository = new CatMikroOrmRepository()

//       expect(() =>
//          repository.delete('00000000-0000-0000-0000-000000000000'),
//       ).rejects.toThrowError('Cat not found')
//    })
// })
