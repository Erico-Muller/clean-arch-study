import {
   Controller,
   Get,
   Post,
   Body,
   Patch,
   Param,
   Delete,
} from '@nestjs/common'

import { CatService } from './cats.service'

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
      return this.catService.create(createCatDto)
   }

   @Get()
   async findAll() {
      return this.catService.findAll()
   }

   @Get(':id')
   async findOne(@Param('id') id: FindOneCatDto) {
      return this.catService.findOne(id)
   }

   @Patch(':id')
   async haveABirthday(@Param('id') id: HaveABirthdayCatDto) {
      return this.catService.haveABirthday(id)
   }

   @Delete(':id')
   async delete(@Param('id') id: DeleteCatDto) {
      return this.catService.delete(id)
   }
}
