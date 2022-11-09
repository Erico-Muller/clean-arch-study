import { Identifier, Name, Age, Breed } from './value-objects'
import { Result } from '../../../shared/core/Result'

import { v4 as uuid } from 'uuid'

export const MAX_AGE = 25

export interface CatProps {
   name: string
   age: number
   breed: string
}

export class Cat {
   private readonly _id: string
   private _name: string
   private _age: number
   private _breed: string

   private constructor(props: CatProps, id?: string) {
      this._id = id
      this._name = props.name
      this._age = props.age
      this._breed = props.breed
   }

   static create(props: CatProps, id?: string): Result<Cat> {
      const identifierOrError = id
         ? Identifier.create(id)
         : Identifier.create(uuid())
      const nameOrError = Name.create(props.name)
      const ageOrError = Age.create(props.age)
      const breedOrError = Breed.create(props.breed)

      const catPropsRes = Result.combine([
         identifierOrError,
         nameOrError,
         ageOrError,
         breedOrError,
      ])

      if (catPropsRes.isFailure) {
         return Result.fail<any>(catPropsRes.getErrorValue())
      }

      const cat = new Cat(
         {
            name: nameOrError.getValue().value,
            age: ageOrError.getValue().value,
            breed: breedOrError.getValue().value,
         },
         identifierOrError.getValue().value,
      )

      return Result.ok<Cat>(cat)
   }

   haveABirthday(): Result<void | string> {
      if (this.age >= MAX_AGE) return Result.fail<string>('Too old cat')
      this.age = this.age + 1

      return
   }

   get id() {
      return this._id
   }

   get name() {
      return this._name
   }

   get age() {
      return this._age
   }

   private set age(value: number) {
      const ageOrError = Age.create(value)

      if (ageOrError.isSuccess) this._age = ageOrError.getValue().value
   }

   get breed() {
      return this._breed
   }

   toObject() {
      return {
         id: this._id,
         name: this._name,
         age: this._age,
         breed: this._breed,
      }
   }
}
