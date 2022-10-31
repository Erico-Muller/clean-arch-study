import { Cat } from '../../../domain/cat.entity'
import { CatRepository } from '../../../repository/cat.repository.interface'

import { PrismaClient } from '@prisma/client'
import type { Cats as CatPrisma } from '@prisma/client'

export class CatPrismaRepository implements CatRepository {
   private readonly prisma: PrismaClient

   constructor() {
      this.prisma = new PrismaClient()
   }

   items: Cat[] = []

   async length(): Promise<number> {
      return await this.prisma.cats.count()
   }

   async exists(catId: string): Promise<boolean> {
      const catExists = await this.prisma.cats.findUnique({
         where: { id: catId },
      })

      return !!catExists === true
   }

   async findAll(): Promise<Cat[]> {
      const cats = await this.prisma.cats.findMany()

      return cats.map(cat =>
         Cat.create({ name: cat.name, age: cat.age, breed: cat.breed }, cat.id),
      )
   }

   async findOne(catId: string): Promise<Cat | null> {
      try {
         const foundCat = await this.prisma.cats.findUniqueOrThrow({
            where: {
               id: catId,
            },
         })

         const cat: Cat = Cat.create(
            { name: foundCat.name, age: foundCat.age, breed: foundCat.breed },
            foundCat.id,
         )

         return cat
      } catch {
         return null
      }
   }

   async insert(cat: Cat): Promise<void> {
      const catObj = cat.toObject()

      const catExists = await this.exists(catObj.id)

      if (catExists) throw new Error('This cat already exists')

      await this.prisma.cats.create({
         data: catObj,
      })
   }

   async incrementAge(catId: string): Promise<void> {
      let foundCat: CatPrisma

      try {
         foundCat = await this.prisma.cats.findUniqueOrThrow({
            where: {
               id: catId,
            },
         })
      } catch {
         throw new Error('Cat not found')
      }

      const cat: Cat = Cat.create(
         { name: foundCat.name, age: foundCat.age, breed: foundCat.breed },
         foundCat.id,
      )

      cat.haveABirthday()
      await this.prisma.cats.update({
         data: {
            age: cat.age,
         },
         where: {
            id: catId,
         },
      })
   }

   async delete(catId: string): Promise<void> {
      try {
         await this.prisma.cats.delete({
            where: {
               id: catId,
            },
         })
      } catch {
         throw new Error('Cat not found')
      }
   }

   async clear(): Promise<void> {
      await this.prisma.cats.deleteMany()
   }
}
