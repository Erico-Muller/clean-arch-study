import { Name } from './name.value-object'
import { NameError } from './name.error'

describe('Name value-object', () => {
   it('Should be able to instantiate a Name', () => {
      const nameOrError = Name.create('John Doe')

      expect(nameOrError.isRight()).toBeTruthy()
   })

   it('Should not be able to instantiate a Name with a wrong length', () => {
      let nameOrError = Name.create('')
      expect(nameOrError.value).toBeInstanceOf(NameError.TooShortNameError)

      nameOrError = Name.create('x'.repeat(40))
      expect(nameOrError.value).toBeInstanceOf(NameError.TooLongNameError)
   })

   it('Should not be able to instantiate a Name with a null value', () => {
      const nameOrError = Name.create(null)
      expect(nameOrError.value).toBeInstanceOf(NameError.InvalidNameError)
   })
})
