import { LoadSurveys } from '../../../../domain/usecases/load-surveys'
import { ok, serverError } from '../../../helpers/http/http-helper'
import { HttpRequest, HttpResponse, IController } from './load-surveys-controller-protocols'

export class LoadSurveysController implements IController {
  constructor (private readonly loadSurveys: LoadSurveys) {}
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const surveys = await this.loadSurveys.load()
      return ok(surveys)
    } catch (error) {
      return serverError(error)
    }
  }
}
