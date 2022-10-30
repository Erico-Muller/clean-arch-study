import { NestFactory } from '@nestjs/core'
import { ValidationPipe } from '@nestjs/common'

import helmet from 'helmet'
import * as compression from 'compression'

import { AppModule } from './shared/infra/http/app.module'

import config from './config/mikro-orm.config'

async function bootstrap() {
   console.log(config)
   const app = await NestFactory.create(AppModule)

   app.useGlobalPipes(new ValidationPipe())
   app.use(helmet())
   app.use(compression())

   await app.listen(3000)
}
bootstrap()
