import type { Either, Result } from '../../../../shared/core/Result'
import type { AppError } from '../../../../shared/core/AppError'
import type { FindOneCatError } from './find-one-cat.error'

export type CatObject = {
   id: string
   name: string
   age: number
   breed: string
}

export type FindOneCatResponse = Either<
   AppError.UnexpectedError | FindOneCatError.CatNotFoundError | Result<any>,
   Result<CatObject>
>
