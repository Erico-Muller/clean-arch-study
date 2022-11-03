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

@Controller('cats')
export class CatController {
   constructor(private readonly catService: CatService) {}

   @Post()
   async create(@Body() createCatDto: CreateCatDto) {
      return await this.catService.create(createCatDto)
   }

   @Get()
   async findAll() {
      return await this.catService.findAll()
   }

   @Get(':id')
   async findOne(@Param() id: FindOneCatDto) {
      const foundCat = await this.catService.findOne(id)

      if (!foundCat) {
         throw new HttpException(
            {
               statusCode: HttpStatus.NOT_FOUND,
               message: ['Cat not found'],
               error: 'Not Found',
            },
            HttpStatus.NOT_FOUND,
         )
      }

      return foundCat
   }

   @Patch(':id')
   async haveABirthday(@Param() id: HaveABirthdayCatDto) {
      return await this.catService.haveABirthday(id)
   }

   @Delete(':id')
   @HttpCode(204)
   async delete(@Param() id: DeleteCatDto) {
      try {
         return await this.catService.delete(id)
      } catch (err) {
         const textMessage = err.message.split(':')[1].trim()

         throw new HttpException(
            {
               statusCode: HttpStatus.NOT_FOUND,
               message: [textMessage],
               error: 'Not Found',
            },
            HttpStatus.NOT_FOUND,
         )
      }
   }
}
