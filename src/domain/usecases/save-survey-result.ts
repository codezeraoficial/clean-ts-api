import { SurveyResultModel } from '@/domain/models/survey-result'

export type SaveSurveyResultModel = Omit<SurveyResultModel, 'id'>

export interface SaveSurveyresult{
  add: (data: SaveSurveyResultModel) => Promise<SurveyResultModel>
}
