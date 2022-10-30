import * as dotenv from 'dotenv'
import { join } from 'path'

import { Options } from '@mikro-orm/core'

import { BaseEntity, Cat } from '../modules/cats/infra/db/mikro-orm/entities'

const paths = {
   dev: join(__dirname, '..', '..', '.env.local'),
   test: join(__dirname, '..', '..', '.env.local'),
   prod: join(__dirname, '..', '..', '.env.prod'),
}

const path = paths[process.env.NODE_ENV]
dotenv.config({
   path: join(path),
})

const config: Options = {
   entities: [BaseEntity, Cat],
   dbName: process.env.DB_NAME,
   type: 'postgresql',
   user: process.env.DB_USER,
   password: process.env.DB_PASSWORD,
   host: process.env.DB_HOST,
   port: +process.env.DB_PORT,
   debug: true,
   // migrations: {
   //    path: join(process.cwd(), 'dist/shared/infra/db/mikro-orm/migrations'),
   //    pathTs: join(process.cwd(), 'src/shared/infra/db/mikro-orm/migrations'),
   //    emit: 'ts',
   // },
}

export default config
