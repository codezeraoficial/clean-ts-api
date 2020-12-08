export const surveyPath = {
  get: {
    security: [{
      apiKeyAuth: []
    }],
    tags: ['Enquete'],
    summary: 'API para listar todas enquetes',
    responses: {
      200: {
        description: 'Sucess',
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/surveys'
            }
          }
        }
      },
      403: {
        $ref: '#/components/forbidden'
      },
      404: {
        $ref: '#/components/notFound'
      },
      500: {
        $ref: '#/components/serverError'
      }
    }
  }
}
