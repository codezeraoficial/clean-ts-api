import { InvalidParamError, MissingParamError } from '../../errors'
import { badRequest } from '../../helpers/http-helper'
import { HttpRequest, IEmailValidator } from '../signup/signup-protocols'
import { LoginController } from './login'

const makeEmailValidator = (): IEmailValidator => {
  class EmailValidaorStub implements IEmailValidator {
    isValid (email: string): boolean {
      return true
    }
  }
  return new EmailValidaorStub()
}

const makeFakeRequest = (): HttpRequest => ({
  body: {
    email: 'any_email@mail.com',
    password: 'any_password'
  }
})
interface SutTypes{
  sut: LoginController
  emailValidaorStub: IEmailValidator
}

const makeSut = (): SutTypes => {
  const emailValidaorStub = makeEmailValidator()
  const sut = new LoginController(emailValidaorStub)
  return {
    sut,
    emailValidaorStub
  }
}
describe('Login Controller', () => {
  test('Should return 400 if no email is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        password: 'any_password'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('email')))
  })

  test('Should return 400 if no password is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        email: 'any_email@mail.com'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('password')))
  })

  test('Should return 400 if an incorrect email is provided', async () => {
    const { sut, emailValidaorStub } = makeSut()
    jest.spyOn(emailValidaorStub, 'isValid').mockReturnValueOnce(false)
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(badRequest(new InvalidParamError('email')))
  })

  test('Should call EmailValidaor with correct email ', async () => {
    const { sut, emailValidaorStub } = makeSut()
    const isValidSpy = jest.spyOn(emailValidaorStub, 'isValid')
    await sut.handle(makeFakeRequest())
    expect(isValidSpy).toHaveBeenCalledWith('any_email@mail.com')
  })
})
