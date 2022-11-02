import { Module } from '@nestjs/common'
import { CatsModule } from '../../../../modules/cats/infra/http/nestjs/cats.module'

import { ConfigModule } from '@nestjs/config'

@Module({
   imports: [
      CatsModule,
      ConfigModule.forRoot({
         isGlobal: true,
      }),
   ],
})
export class AppModule {}
