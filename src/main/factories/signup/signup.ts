import { DbAddAccount } from '../../../data/usecases/addAccount/db-add-account'
import { BcrypAdapter } from '../../../infra/criptography/bcrypt-adapter/bcrypt-adapter'
import { AccountMongoRepository } from '../../../infra/db/mongodb/account-repository/account'
import { LogMongoRepository } from '../../../infra/db/mongodb/log-repository/log'
import { SignUpController } from '../../../presentations/controllers/signup/singup'
import { IController } from '../../../presentations/protocols'
import { LogControllerDecorator } from '../../decorators/log'
import { makeSigUpValidation } from './signup-validation'

export const makeSigUpController = (): IController => {
  const salt = 12
  const bcryptAdapter = new BcrypAdapter(salt)
  const accountMongoRepository = new AccountMongoRepository()
  const dbAddAccoount = new DbAddAccount(bcryptAdapter, accountMongoRepository)
  const signUpController = new SignUpController(dbAddAccoount, makeSigUpValidation())
  const logMongoRepository = new LogMongoRepository()
  return new LogControllerDecorator(signUpController, logMongoRepository)
}
