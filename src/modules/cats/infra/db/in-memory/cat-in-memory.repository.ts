import { Cat } from '../../../domain/cat.entity'
import { CatRepository } from '../../../repository/cat.repository.interface'

export class CatInMemoryRepository implements CatRepository {
   items: Cat[] = []

   async length(): Promise<number> {
      return this.items.length
   }

   async exists(catId: string): Promise<boolean> {
      const catExists = this.items.find(cat => cat.id === catId)

      return !!catExists === true
   }

   async findAll(): Promise<Cat[]> {
      return this.items
   }

   async findOne(catId: string): Promise<Cat | null> {
      if (!this.items.length) return null

      const cat = this.items.find(cat => cat.id === catId)
      return cat || null
   }

   async insert(cat: Cat): Promise<void> {
      const catExists = await this.exists(cat.id)

      if (catExists) throw new Error('this cat already exists')

      this.items.push(cat)
   }

   async incrementAge(catId: string): Promise<void> {
      const catIndex = this.items.findIndex(cat => cat.id === catId)

      if (catIndex === -1) throw new Error('Cat not found')

      this.items[catIndex].haveABirthday()
   }

   async delete(catId: string): Promise<void> {
      const catIndex = this.items.findIndex(cat => cat.id === catId)

      if (catIndex === -1) throw new Error('Cat not found')

      this.items.splice(catIndex, 1)
   }

   async clear(): Promise<void> {
      this.items = []
   }
}
