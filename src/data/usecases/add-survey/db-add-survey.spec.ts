import { AccountModel } from '../../../domain/models/account'
import { DbAddSurvey } from './db-add-survey'
import { AddSurveyModel, AddSurveyRepository } from './db-add-survey-protocols'

const makeFakeSurveydata = (): AddSurveyModel => ({
  question: 'any_question',
  answers: [{
    image: 'any_image',
    answer: 'any_answer'
  }]
})

describe('DbAddSurvey Usecase', () => {
  test('Should call DbAddSurveyRepository with corect values', async () => {
    class AddSurveyRepositoryStub implements AddSurveyRepository {
      async add (account: AddSurveyModel): Promise<AccountModel> {
        return await new Promise(resolve => resolve())
      }
    }
    const addSurveyRepositoryStub = new AddSurveyRepositoryStub()
    const addSpy = jest.spyOn(addSurveyRepositoryStub, 'add')
    const sut = new DbAddSurvey(addSurveyRepositoryStub)
    const surveyData = makeFakeSurveydata()
    await sut.add(surveyData)
    expect(addSpy).toHaveBeenCalledWith(surveyData)
  })
})
