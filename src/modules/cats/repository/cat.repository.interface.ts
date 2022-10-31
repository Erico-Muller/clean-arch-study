import { Cat } from '../domain/cat.entity'

export interface CatRepository {
   length(): Promise<number>
   exists(catId: string): Promise<boolean>
   findAll(): Promise<Cat[]>
   findOne(catId: string): Promise<Cat | null>
   insert(cat: Cat): Promise<void>
   incrementAge(catId: string): Promise<void>
   delete(catId: string): Promise<void>
   clear(): Promise<void>
}
