import { EmailValidation, RequiredFieldValidation, ValidationComposite, CompareFieldsValidation } from '../../../../presentations/helpers/validators'
import { Validation } from '../../../../presentations/protocols/validation'
import { IEmailValidator } from '../../../../presentations/protocols/email-validator'
import { makeSignUpValidation } from '../signup/signup-validation-factory'

jest.mock('../../../../presentations/helpers/validators/validation-composite')
const makeEmailValidator = (): IEmailValidator => {
  class EmailValidatorStub implements IEmailValidator {
    isValid (email: string): boolean {
      return true
    }
  }
  return new EmailValidatorStub()
}
describe('SigUpValiadtionFactory', () => {
  test('Should call validation composie with all validations', () => {
    makeSignUpValidation()
    const validations: Validation[] = []
    for (const field of ['name', 'email', 'password', 'passwordConfirmation']) {
      validations.push(new RequiredFieldValidation(field))
    }
    validations.push(new CompareFieldsValidation('password', 'passwordConfirmation'))
    validations.push(new EmailValidation('email', makeEmailValidator()))
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
