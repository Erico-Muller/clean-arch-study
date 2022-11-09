import {
   Controller,
   Get,
   Post,
   Body,
   Patch,
   Param,
   Delete,
   HttpCode,
   HttpException,
   HttpStatus,
} from '@nestjs/common'

import { CatService } from './cat.service'

import {
   CreateCatDto,
   FindOneCatDto,
   HaveABirthdayCatDto,
   DeleteCatDto,
} from './dto'

import {
   CatObject,
   CatsObject,
   FindOneCatErrors,
   HaveABirthdayCatErrors,
   DeleteCatErrors,
} from '../../../use-cases'

@Controller('cats')
export class CatController {
   constructor(private readonly catService: CatService) {}

   private throwUnexpectedError() {
      throw new HttpException(
         {
            statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
            message: ['Unexpected error!'],
            error: 'Unexpected',
         },
         HttpStatus.INTERNAL_SERVER_ERROR,
      )
   }

   @Post()
   @HttpCode(201)
   async create(@Body() createCatDto: CreateCatDto): Promise<void> {
      const catOrError = await this.catService.create(createCatDto)

      if (catOrError.isLeft()) {
         return this.throwUnexpectedError()
      }
   }

   @Get()
   async findAll(): Promise<CatsObject> {
      const catsOrError = await this.catService.findAll()

      if (catsOrError.isLeft() === true) {
         this.throwUnexpectedError()
      }

      return catsOrError.value.getValue()
   }

   @Get(':id')
   async findOne(@Param() id: FindOneCatDto): Promise<CatObject> {
      const foundCatOrError = await this.catService.findOne(id)

      if (foundCatOrError.value instanceof FindOneCatErrors.CatNotFoundError) {
         throw new HttpException(
            {
               statusCode: HttpStatus.NOT_FOUND,
               message: [foundCatOrError.value.getErrorValue().message],
               error: 'Not Found',
            },
            HttpStatus.NOT_FOUND,
         )
      } else if (foundCatOrError.isLeft() === true) {
         this.throwUnexpectedError()
      }

      return foundCatOrError.value.getValue()
   }

   // yes, this code also disgusts me.
   // open-closed principle doesn't exist here
   @Patch(':id')
   async haveABirthday(@Param() id: HaveABirthdayCatDto): Promise<void> {
      const catOrError = await this.catService.haveABirthday(id)

      if (catOrError.value instanceof HaveABirthdayCatErrors.CatNotFoundError) {
         throw new HttpException(
            {
               statusCode: HttpStatus.NOT_FOUND,
               message: [catOrError.value.getErrorValue().message],
               error: 'Not Found',
            },
            HttpStatus.NOT_FOUND,
         )
      } else if (
         catOrError.value instanceof HaveABirthdayCatErrors.TooOldCatError
      ) {
         throw new HttpException(
            {
               statusCode: HttpStatus.BAD_REQUEST,
               message: [catOrError.value.getErrorValue().message],
               error: 'Bad Request',
            },
            HttpStatus.BAD_REQUEST,
         )
      } else if (catOrError.isLeft() === true) {
         this.throwUnexpectedError()
      }
   }

   @Delete(':id')
   @HttpCode(204)
   async delete(@Param() id: DeleteCatDto) {
      // const textMessage = err.message.split(':')[1].trim()
      const deletedCatOrError = await this.catService.delete(id)

      if (deletedCatOrError.value instanceof DeleteCatErrors.CatNotFoundError) {
         throw new HttpException(
            {
               statusCode: HttpStatus.NOT_FOUND,
               message: [deletedCatOrError.value.getErrorValue().message],
               error: 'Not Found',
            },
            HttpStatus.NOT_FOUND,
         )
      } else if (deletedCatOrError.isLeft() === true) {
         this.throwUnexpectedError()
      }
   }
}
