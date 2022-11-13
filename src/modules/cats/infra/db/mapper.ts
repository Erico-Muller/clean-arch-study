import { Cat } from '../../domain/cat.entity'
import type { Cats } from '@prisma/client'

export class CatMapper {
   public static toDomain(cat: Cats): Cat {
      const domainCatOrError = Cat.create(
         { name: cat.name, age: cat.age, breed: cat.breed },
         cat.id,
      )

      domainCatOrError.value.isFailure
         ? console.log(domainCatOrError.value.getErrorValue())
         : ''

      return domainCatOrError.value.isSuccess
         ? domainCatOrError.value.getValue()
         : null
   }
}
