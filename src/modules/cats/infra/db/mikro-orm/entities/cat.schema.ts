import { Entity, Property } from '@mikro-orm/core'
import { BaseEntity } from './base-entity.schema'

@Entity({
   tableName: 'cats',
})
export class Cat extends BaseEntity {
   @Property({
      length: 30,
   })
   name: string

   @Property({
      length: 25,
   })
   age: number

   @Property({
      length: 30,
   })
   breed: string

   constructor(name: string, age: number, breed: string) {
      super()
      this.name = name
      this.age = age
      this.breed = breed
   }
}
