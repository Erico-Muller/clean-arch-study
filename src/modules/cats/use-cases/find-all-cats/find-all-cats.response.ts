import type { Either, Result } from '../../../../shared/core/Result'
import type { AppError } from '../../../../shared/core/AppError'

export type CatsObject = {
   id: string
   name: string
   age: number
   breed: string
}[]

export type FindAllCatsResponse = Either<
   AppError.UnexpectedError | Result<any>,
   Result<CatsObject>
>
