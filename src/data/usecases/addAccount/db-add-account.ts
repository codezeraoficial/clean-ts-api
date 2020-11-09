import { IAddAccount, Hasher, AccountModel, AddAccountModel, IAddAccountRepository } from './db-add-account-protocols'

export class DbAddAccount implements IAddAccount {
  private readonly hasher: Hasher
  private readonly addAccountRepository: IAddAccountRepository
  constructor (hasher: Hasher, addAccountRepository: IAddAccountRepository) {
    this.hasher = hasher
    this.addAccountRepository = addAccountRepository
  }

  async add (accountData: AddAccountModel): Promise<AccountModel> {
    const hashedPassword = await this.hasher.hash(accountData.password)
    const account = await this.addAccountRepository.add(Object.assign({}, accountData, { password: hashedPassword }))
    return account
  }
}
