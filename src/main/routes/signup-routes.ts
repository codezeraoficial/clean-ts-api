import { Router } from 'express'
import { adaptRoute } from '../adapters/express-route-adapter'
import { makeSigUpController } from '../factories/signup'

export default (router: Router): void => {
  router.post('/signup', adaptRoute(makeSigUpController()))
}
