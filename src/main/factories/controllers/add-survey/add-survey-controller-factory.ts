import { IController } from '../../../../presentations/protocols'
import { makeLogControllerDecorator } from '../../decorators/log-controller-decorator-factory'
import { AddSurveyController } from '../../../../presentations/controllers/survey/add-survey/add-survey-controller'
import { makeAddSurveyValidation } from './add-survey-validation-factory'
import { makeDbAddSurvey } from '../../usecases/add-survey/db-add-survey-factory'

export const makeAddSurveyController = (): IController => {
  const controller = new AddSurveyController(makeAddSurveyValidation(), makeDbAddSurvey())
  return makeLogControllerDecorator(controller)
}
