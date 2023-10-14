import { HttpException, HttpStatus } from '@nestjs/common'

export abstract class BaseError extends HttpException {
   constructor(public message: string, public type: HttpStatus) {
      super(message, type)
   }
}
