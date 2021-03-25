import '@testing-library/jest-dom/extend-expect'
import { server } from './src/__mocks__/server'

// Establish API mocking before all tests.
beforeAll(() => {
    process.env.SERVER_URL_BASE = '/'
    server.listen()
})

beforeEach(() => {
    jest.clearAllMocks()
})

// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => server.resetHandlers())

// Clean up after the tests are finished.
afterAll(() => server.close())
