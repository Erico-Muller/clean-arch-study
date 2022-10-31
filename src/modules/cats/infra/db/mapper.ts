import { Cat } from '../../domain/cat.entity'
import type { Cats } from '@prisma/client'

export class CatMapper {
   public static toDomain(cat: Cats): Cat {
      return Cat.create(
         { name: cat.name, age: cat.age, breed: cat.breed },
         cat.id,
      )
   }
}
