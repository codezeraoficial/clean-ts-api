import { AccountModel } from '../../../../domain/models/account'
import { AddSurveyModel } from '../../../../domain/usecases/add-survey'

export interface AddSurveyRepository{
  add: (account: AddSurveyModel) => Promise<AccountModel>
}
