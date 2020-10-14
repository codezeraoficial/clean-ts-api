import { RequiredFieldValidation } from '../../presentations/helpers/validators/required-field-validation'
import { Validation } from '../../presentations/helpers/validators/validation'
import { ValidationComposite } from '../../presentations/helpers/validators/validation-composite'
import { makeSigUpValidation } from './signup-validation'

jest.mock('../../presentations/helpers/validators/validation-composite')

describe('SigUpValiadtion Factory', () => {
  test('Should call validation composie with all validations', () => {
    makeSigUpValidation()
    const validations: Validation[] = []
    for (const field of ['name', 'email', 'password', 'passwordConfirmation']) {
      validations.push(new RequiredFieldValidation(field))
    }
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
