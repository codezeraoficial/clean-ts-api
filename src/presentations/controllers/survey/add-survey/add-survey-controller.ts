import { Validation } from '../../../protocols'
import { HttpRequest, HttpResponse, IController } from './add-survey-controller-protocols'

export class AddSurveyController implements IController {
  constructor (
    private readonly validation: Validation
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    this.validation.validate(httpRequest.body)
    return await new Promise(resolve => resolve(null))
  }
}
