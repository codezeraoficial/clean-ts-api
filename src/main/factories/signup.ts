import { DbAddAccount } from '../../data/usecases/addAccount/db-add-account'
import { BcrypAdapter } from '../../infra/criptography/bcrypt-adapter'
import { AccountMongoRepository } from '../../infra/db/mongodb/account-repository/account'
import { SignUpController } from '../../presentations/controllers/signup/singup'
import { IController } from '../../presentations/protocols'
import { EmailValidatorAdapter } from '../../utils/email-validator-adapter'
import { LogControllerDecorator } from '../decorators/log'

export const makeSigUpController = (): IController => {
  const salt = 12
  const emailValidatorAdapter = new EmailValidatorAdapter()
  const bcryptAdapter = new BcrypAdapter(salt)
  const accountMongoRepository = new AccountMongoRepository()
  const dbAddAccoount = new DbAddAccount(bcryptAdapter, accountMongoRepository)
  const signUpController = new SignUpController(emailValidatorAdapter, dbAddAccoount)
  return new LogControllerDecorator(signUpController)
}
