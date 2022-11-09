import { Name } from './name.value-object'

describe('Name value-object', () => {
   it('Should be able to instantiate a Name', () => {
      const nameOrError = Name.create('John Doe')

      expect(nameOrError.isSuccess).toBeTruthy()
      expect(nameOrError.getValue().value).toBe('John Doe')
   })

   it('Should not be able to instantiate a Name with a wrong length', () => {
      let nameOrError = Name.create('')
      expect(nameOrError.isFailure).toBeTruthy()

      nameOrError = Name.create('x'.repeat(40))
      expect(nameOrError.isFailure).toBeTruthy()
   })
})
