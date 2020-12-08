import { loginPath, surveyPath, signUpPath } from './paths'
import { badRequest, serverError, unauthorized, notFound, forbidden } from './components'
import { accountSchema, errorSchema, loginParamsSchema, surveyAnswerSchema, surveySchema, surveysSchema, apiKeyAuthSchema, signUpParamsSchema, addSurveyParamsSchema } from './schemas'

export default {
  openapi: '3.0.0',
  info: {
    title: 'Clean Node Api',
    description: 'API do curso do Mango para realizar enquetes entre programadores',
    version: '1.0.0'
  },
  license: {
    name: 'LZR - 3.0',
    url: 'leozeraio.netlify.com'
  },
  servers: [{
    url: '/api'
  }],
  tags: [{
    name: 'Login'
  },{
    name: 'Enquete'
  }],
  paths: {
    '/login': loginPath,
    '/signup': signUpPath,
    '/surveys': surveyPath
  },
  schemas: {
    account: accountSchema,
    loginParams: loginParamsSchema,
    error: errorSchema,
    survey: surveySchema,
    surveys: surveysSchema,
    surveyAnswer: surveyAnswerSchema,
    signUpParams: signUpParamsSchema,
    addSurveyParams: addSurveyParamsSchema
  },
  components: {
    securitySchemes: {
      apiKeyAuth: apiKeyAuthSchema
    },
    badRequest,
    unauthorized,
    serverError,
    notFound,
    forbidden
  }
}
