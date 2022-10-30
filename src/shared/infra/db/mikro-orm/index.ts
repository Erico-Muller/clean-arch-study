import 'reflect-metadata'
import { EntityManager, EntityRepository, MikroORM } from '@mikro-orm/core'
import type { PostgreSqlDriver } from '@mikro-orm/postgresql'

import { Cat } from '../../../../modules/cats/infra/db/mikro-orm/entities'

export const DI = {} as {
   orm: MikroORM<PostgreSqlDriver>
   em: EntityManager
   catRepository: EntityRepository<Cat>
}

export async function createConnection() {
   DI.orm = await MikroORM.init()
   DI.em = DI.orm.em
   DI.catRepository = DI.orm.em.getRepository(Cat)

   return DI
}
