/* eslint-disable jest/expect-expect */
const request = require('supertest')
const app = require('../server')

describe('Test GET /applications/:companyName', () => {
  test('It should return all the registered applications', async () => {
    await request(app)
      .get('/applications/amazon')
      .set('test-auth', 'mock-user')
      .expect(200)
      .expect('Content-Type', /json/)
  })

  test('It should return with 401 as user is not logged in', async () => {
    await request(app)
      .get('/applications/amazon')
      .expect(401)
  })
})

describe('Test GET /applications/:applicationId/screenFlow', () => {
  test("It should return selected Application's screen Flow", async () => {
    await request(app)
      .get('/applications/66ceb688-a2b3-11ed-a8fc-0242ac120002/screenFlow')
      .set('test-auth', 'mock-user')
      .expect(200)
      .expect('Content-Type', /json/)
  })

  test('It should return status code 400 if Application Id is incorrect', async () => {
    await request(app)
      .get('/applications/66ceb688-a2b3-11ed-a8fc/screenFlow')
      .set('test-auth', 'mock-user')
      .expect(400)
  })
})

describe('Test PUT /applications/:applicationId/screenFlow', () => {
  const updatedApplicationScreenFlow = {
    applicationScreenFlow: {
      applicationId: '66ceb688-a2b3-11ed-a8fc-0242ac120002',
      applicationName: 'SocialBook',
      lastUpdatedOn: '08:16:2023:09:35:49',
      applicationScreenFlow: [
        {
          screenName: 'Home',
          portName: 'Home.RandomPage',
          destinationView: 'RandomPage'
        },
        {
          screenName: 'Home',
          portName: 'Home.Login',
          destinationView: 'SignUp'
        },
        {
          screenName: 'Home',
          portName: 'Home.SignUp',
          destinationView: 'SignUp'
        }
      ]
    }
  }

  test('It should return updated screen flow with status 200', async () => {
    const response = await request(app)
      .put('/applications/66ceb688-a2b3-11ed-a8fc-0242ac120002/screenFlow')
      .set('test-auth', 'mock-user')
      .send({ mock: updatedApplicationScreenFlow })
      .expect(200)
      .expect('Content-Type', /json/)

    expect(response.body).toEqual(updatedApplicationScreenFlow.applicationScreenFlow)
  })
})

describe('Test GET /applications/:applicationId/nodesInfo', () => {
  test('It should return Nodes Information with status 200', async () => {
    await request(app)
      .get('/applications/66ceb688-a2b3-11ed-a8fc-0242ac120002/nodesInfo')
      .set('test-auth', 'mock-user')
      .expect(200)
      .expect('Content-Type', /json/)
  })

  test('It should return error with status 400 if Application Id is incorrect', async () => {
    await request(app)
      .get('/applications/66ceb688-a2b3-11ed-a8fc/nodesInfo')
      .set('test-auth', 'mock-user')
      .expect(400)
  })
})

describe('Test GET /applications/:applicationId/screens', () => {
  test('It should return Nodes Information with status 200', async () => {
    await request(app)
      .get('/applications/66ceb688-a2b3-11ed-a8fc-0242ac120002/screens')
      .set('test-auth', 'mock-user')
      .expect(200)
      .expect('Content-Type', /json/)
  })

  test('It should return error with status 400 if Application Id is incorrect', async () => {
    await request(app)
      .get('/applications/66ceb688-a2b3-11ed-a8fc/screens')
      .set('test-auth', 'mock-user')
      .expect(400)
  })
})
