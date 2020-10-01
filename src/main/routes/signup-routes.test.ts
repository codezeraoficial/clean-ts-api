import request from 'supertest'
import app from '../config/app'

describe('Signup Routes', () => {
  test('Should retur an account on sucess', async () => {
    await request(app)
      .post('/api/signup')
      .send({
        name: 'Leonardo',
        email: 'leobhal13@gmail.com',
        password: '123',
        passwordConfirmation: '123'
      })
      .expect(200)
  })
})
