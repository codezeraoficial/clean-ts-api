import { EmailValidation, RequiredFieldValidation, ValidationComposite } from '../../../presentations/helpers/validators'
import { makeLoginValidation } from './login-validation'
import { Validation } from '../../../presentations/protocols/validation'
import { IEmailValidator } from '../../../presentations/protocols/email-validator'

jest.mock('../../../presentations/helpers/validators/validation-composite')
const makeEmailValidator = (): IEmailValidator => {
  class EmailValidatorStub implements IEmailValidator {
    isValid (email: string): boolean {
      return true
    }
  }
  return new EmailValidatorStub()
}
describe('LoginValiadtionFactory', () => {
  test('Should call validation composie with all validations', () => {
    makeLoginValidation()
    const validations: Validation[] = []
    for (const field of ['email', 'password']) {
      validations.push(new RequiredFieldValidation(field))
    }
    validations.push(new EmailValidation('email', makeEmailValidator()))
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})