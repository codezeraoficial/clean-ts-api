import Mockdate from 'mockdate'
import { DbAddSurvey } from './db-add-survey'
import { AddSurveyRepository } from './db-add-survey-protocols'
import { mockFakeSurveyParams, throwError } from '@/domain/test'
import { mockAddSurveyRepository } from '@/data/test'

type SutTypes = {
  sut: DbAddSurvey
  addSurveyRepositoryStub: AddSurveyRepository
}
const makeSut = (): SutTypes => {
  const addSurveyRepositoryStub = mockAddSurveyRepository()
  const sut = new DbAddSurvey(addSurveyRepositoryStub)
  return {
    sut,
    addSurveyRepositoryStub
  }
}

describe('DbAddSurvey Usecase', () => {
  beforeAll(() => {
    Mockdate.set(new Date())
  })

  afterAll(() => {
    Mockdate.reset()
  })

  test('Should call AddSurveyRepository with corect values', async () => {
    const { addSurveyRepositoryStub, sut } = makeSut()
    const addSpy = jest.spyOn(addSurveyRepositoryStub, 'add')
    const surveyData = mockFakeSurveyParams()
    await sut.add(surveyData)
    expect(addSpy).toHaveBeenCalledWith(surveyData)
  })

  test('Should throw if AddSurveyRepository throws', async () => {
    const { addSurveyRepositoryStub, sut } = makeSut()
    jest.spyOn(addSurveyRepositoryStub, 'add').mockImplementationOnce(throwError)
    const promise = sut.add(mockFakeSurveyParams())
    await expect(promise).rejects.toThrow()
  })
})
