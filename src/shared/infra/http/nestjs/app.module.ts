import { Module } from '@nestjs/common'
import { CatModule } from '../../../../modules/cats/infra/http/nestjs/cat.module'

import { ConfigModule } from '@nestjs/config'

@Module({
   imports: [
      CatModule,
      ConfigModule.forRoot({
         isGlobal: true,
      }),
   ],
})
export class AppModule {}
