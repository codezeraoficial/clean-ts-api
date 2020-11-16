import { DbAddAccount } from '../../../data/usecases/addAccount/db-add-account'
import { BcrypAdapter } from '../../../infra/criptography/bcrypt-adapter/bcrypt-adapter'
import { AccountMongoRepository } from '../../../infra/db/mongodb/account/account-mongo-repository'
import { LogMongoRepository } from '../../../infra/db/mongodb/log/log-mongo-repository'
import { SignUpController } from '../../../presentations/controllers/signup/singup-controller'
import { IController } from '../../../presentations/protocols'
import { LogControllerDecorator } from '../../decorators/log-controller-decorator'
import { makeSigUpValidation } from './signup-validation-factory'

export const makeSigUpController = (): IController => {
  const salt = 12
  const bcryptAdapter = new BcrypAdapter(salt)
  const accountMongoRepository = new AccountMongoRepository()
  const dbAddAccoount = new DbAddAccount(bcryptAdapter, accountMongoRepository)
  const signUpController = new SignUpController(dbAddAccoount, makeSigUpValidation())
  const logMongoRepository = new LogMongoRepository()
  return new LogControllerDecorator(signUpController, logMongoRepository)
}
