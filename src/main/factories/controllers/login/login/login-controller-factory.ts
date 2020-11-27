import { LoginController } from '../../../../../presentation/controllers/login/login/login-controller'
import { IController } from '../../../../../presentation/protocols'
import { makeLoginValidation } from './login-validation-factory'
import { makeDbAuthetication } from '../../../usecases/account/authentication/db-authentication-factory'
import { makeLogControllerDecorator } from '../../../decorators/log-controller-decorator-factory'

export const makeLoginController = (): IController => {
  const controller = new LoginController(makeDbAuthetication(), makeLoginValidation())
  return makeLogControllerDecorator(controller)
}
