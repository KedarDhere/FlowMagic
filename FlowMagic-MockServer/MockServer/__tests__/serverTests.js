/* eslint-disable jest/expect-expect */
const nock = require('nock')
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

  test('It should return with 400 as company name is not registered', async () => {
    await request(app)
      .get('/applications/osu')
      .set('test-auth', 'mock-user')
      .expect(400)
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

  test('It should return with 400 as application is not registered', async () => {
    await request(app)
      .get('/applications/66ceb688-a2b3-11ed-dfgh/screenFlow')
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
      .send(updatedApplicationScreenFlow)
      .expect(200)
      .expect('Content-Type', /json/)
    console.log(response.body)
    expect(response.body).toEqual(updatedApplicationScreenFlow)
  })

  test('It should return updated screen flow with status 400', async () => {
    await request(app)
      .put('/applications/66ceb688-a2b3-11ed/screenFlow')
      .set('test-auth', 'mock-user')
      .send(updatedApplicationScreenFlow)
      .expect(400)
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

  test('It should return with 400 as application is not registered', async () => {
    await request(app)
      .get('/applications/66ceb688-a2b3-11ed-dfgh/nodesInfo')
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

  test('It should return with 400 as application is not registered', async () => {
    await request(app)
      .get('/applications/66ceb688-a2b3-11ed-dfgh/screens')
      .set('test-auth', 'mock-user')
      .expect(400)
  })
})

describe('Google Authentication Callback', () => {
  beforeEach(() => {
    // Clean all nocks after each test to ensure a clean slate
    nock.cleanAll()
  })

  it('should redirect to CLIENT_URL on successful authentication', async () => {
    // Mock Google's OAuth response for success
    const mockedToken = 'mocked_token_123'

    nock('https://www.googleapis.com')
      .post('/oauth2/v4/token')
      .reply(200, {
        access_token: mockedToken,
        token_type: 'Bearer',
        expires_in: 3600
      })

    const response = await request(app).get('/auth/google/callback').send()

    expect(response.status).toBe(302) // Expecting a redirection status code
    console.log(response.headers)
    const decodedURL = decodeURIComponent(response.headers.location)
    console.log(decodedURL)
  })

  it('should redirect to /login/failed on failed authentication', async () => {
    // Mock Google's OAuth response for failure
    nock('https://www.googleapis.com')
      .post('/oauth2/v4/token')
      .reply(401, {
        error: 'invalid_request',
        error_description: 'Invalid authentication request.'
      })

    const response = await request(app).get('/auth/google/callback').send()

    expect(response.status).toBe(302) // Expecting a redirection status code
  })
})

describe("Test .use('*') path", () => {
  test('It should return with 404 if route is not registered', async () => {
    await request(app)
      .get('/')
      .expect(404)
  })
})
