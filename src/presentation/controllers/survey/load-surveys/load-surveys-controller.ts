import { LoadSurveys } from '../../../../domain/usecases/load-surveys'
import { noContent, ok, serverError } from '../../../helpers/http/http-helper'
import { HttpRequest, HttpResponse, IController } from './load-surveys-controller-protocols'

export class LoadSurveysController implements IController {
  constructor (private readonly loadSurveys: LoadSurveys) {}
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const surveys = await this.loadSurveys.load()
      return surveys.length ? ok(surveys) : noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}
