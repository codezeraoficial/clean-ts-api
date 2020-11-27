import { makeSignUpValidation } from './signup-validation-factory'
import { SignUpController } from '@/presentation/controllers/login/signup/singup-controller'
import { makeLogControllerDecorator } from '@/main/factories/decorators/log-controller-decorator-factory'
import { makeDbAddAccount } from '@/main/factories/usecases/account/add-account/db-add-account-factory'
import { makeDbAuthetication } from '@/main/factories/usecases/account/authentication/db-authentication-factory'
import { IController } from '@/presentation/protocols'

export const makeSigUpController = (): IController => {
  const controller = new SignUpController(makeDbAddAccount(), makeSignUpValidation(), makeDbAuthetication())
  return makeLogControllerDecorator(controller)
}
