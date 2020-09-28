import { IAddAccount, Encrypter, AccountModel, AddAccountModel, IAddAccountRepository } from './db-add-account-protocols'

export class DbAddAccount implements IAddAccount {
  private readonly encrypter: Encrypter
  private readonly addAccountRepository: IAddAccountRepository
  constructor (encrypter: Encrypter, addAccountRepository: IAddAccountRepository) {
    this.encrypter = encrypter
    this.addAccountRepository = addAccountRepository
  }

  async add (accountData: AddAccountModel): Promise<AccountModel> {
    const hashedPassword = await this.encrypter.encrypt(accountData.password)
    const account = await this.addAccountRepository.add(Object.assign({}, accountData, { password: hashedPassword }))
    return account
  }
}
