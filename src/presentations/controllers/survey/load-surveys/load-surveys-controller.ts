import { LoadSurveys } from '../../../../domain/usecases/load-surveys'
import { HttpRequest, HttpResponse, IController } from './load-surveys-controller-protocols'

export class LoadSurveysController implements IController {
  constructor (private readonly loadSurveys: LoadSurveys) {}
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    await this.loadSurveys.load()
    return null
  }
}
