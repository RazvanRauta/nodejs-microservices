import '@testing-library/jest-dom/extend-expect'

// Establish API mocking before all tests.
beforeAll(() => {
    process.env.SERVER_URL_BASE = '/'
})

beforeEach(() => {
    jest.clearAllMocks()
})
