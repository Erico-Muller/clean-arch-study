import type { Either, Result } from '../../../../shared/core/Result'
import type { AppError } from '../../../../shared/core/AppError'
import type { FindOneCatErrors } from './find-one-cat.errors'

export type CatObject = {
   id: string
   name: string
   age: number
   breed: string
}

export type FindOneCatResponse = Either<
   AppError.UnexpectedError | FindOneCatErrors.CatNotFoundError | Result<any>,
   Result<CatObject>
>
