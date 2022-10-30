import { Cat } from '../../../domain/cat.entity'
import { CatRepository } from '../../../repository/cat.repository.interface'

import { createConnection } from '../../../../../shared/infra/db/mikro-orm'

export class CatMikroOrmRepository implements CatRepository {
   async lenght(): Promise<number> {
      const DI = await createConnection()
      return await DI.catRepository.count()
   }

   async findAll(): Promise<Cat[]> {
      return [].concat(
         Cat.create({
            name: 'cat',
            age: 2,
            breed: 'Siamese',
         }),
      )
   }

   async findOne(catId: string): Promise<Cat | null> {
      return Cat.create({ name: 'cat', age: 2, breed: 'Siamese' })
   }

   async insert(cat: Cat): Promise<void> {
      return
   }

   async incrementAge(catId: string): Promise<void> {
      return
   }

   async delete(catId: string): Promise<void> {
      return
   }
}
