import { BcrypAdapter } from '@/infra/criptography/bcrypt-adapter/bcrypt-adapter'
import { AccountMongoRepository } from '@/infra/db/mongodb/account/account-mongo-repository'
import { DbAddAccount } from '@/data/usecases/add-account/db-add-account'
import { IAddAccount } from '@/domain/usecases/add-account'

export const makeDbAddAccount = (): IAddAccount => {
  const salt = 12
  const bcryptAdapter = new BcrypAdapter(salt)
  const accountMongoRepository = new AccountMongoRepository()
  return new DbAddAccount(bcryptAdapter, accountMongoRepository, accountMongoRepository)
}
