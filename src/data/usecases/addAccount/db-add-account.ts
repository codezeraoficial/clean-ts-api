import { IAddAccount, Hasher, AccountModel, AddAccountModel, IAddAccountRepository, LoadAccountByEmailRepository } from './db-add-account-protocols'

export class DbAddAccount implements IAddAccount {
  constructor (
    private readonly hasher: Hasher,
    private readonly addAccountRepository: IAddAccountRepository,
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository

  ) {}

  async add (accountData: AddAccountModel): Promise<AccountModel> {
    await this.loadAccountByEmailRepository.loadByEmail(accountData.email)
    const hashedPassword = await this.hasher.hash(accountData.password)
    const account = await this.addAccountRepository.add(Object.assign({}, accountData, { password: hashedPassword }))
    return account
  }
}
