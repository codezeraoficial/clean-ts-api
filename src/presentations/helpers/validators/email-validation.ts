import { InvalidParamError } from '../../errors'
import { IEmailValidator } from '../../protocols/email-validator'
import { Validation } from './validation'

export class EmailValidation implements Validation {
  private readonly emailValidator: IEmailValidator
  private readonly fieldName: string
  constructor (fieldName: string, emailValidator: IEmailValidator) {
    this.fieldName = fieldName
    this.emailValidator = emailValidator
  }

  validate (input: any): Error {
    const isValid = this.emailValidator.isValid(input[this.fieldName])
    if (!isValid) {
      return new InvalidParamError(this.fieldName)
    }
  }
}
