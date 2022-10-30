import { Identifier, Name, Age, Breed } from './value-objects'

import { v4 as uuid } from 'uuid'

const MAX_AGE = 25

export interface CatProps {
   name: string
   age: number
   breed: string
}

export class Cat {
   private readonly _id: Identifier
   private _name: Name
   private _age: Age
   private _breed: Breed

   private constructor(props: CatProps, id?: string) {
      this._id = id ? new Identifier(id) : new Identifier(uuid())
      this._name = new Name(props.name)
      this._age = new Age(props.age)
      this._breed = new Breed(props.breed)

      if (this._age.value > MAX_AGE) throw new Error('Too old cat')
      if (this._age.value < 0) throw new Error('Invalid age')
   }

   static create(props: CatProps, id?: string): Cat {
      return new Cat(props, id)
   }

   haveABirthday() {
      if (this.age >= MAX_AGE) throw new Error('Too old cat')
      this.age = this.age + 1
   }

   get id() {
      return this._id.value
   }

   get name() {
      return this._name.value
   }

   get age() {
      return this._age.value
   }

   private set age(value: number) {
      this._age = new Age(value)
   }

   get breed() {
      return this._breed.value
   }

   toObject() {
      return {
         id: this._id.value,
         name: this._name.value,
         age: this._age.value,
         breed: this._breed.value,
      }
   }
}
