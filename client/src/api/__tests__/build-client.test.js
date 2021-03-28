import buildClient from '../build-client'

describe('Build client function', () => {
    const { window } = global

    afterEach(() => {
        global.window = window
    })

    it('should create axios instance with SERVER_URL_BASE if window is undefined', () => {
        delete global.window
        process.env.SERVER_URL_BASE = 'http://test'
        const client = buildClient({})
        expect(client.defaults.baseURL).toEqual('http://test')
    })

    it('should create axios instance with baseURL / if window is defined', () => {
        const client = buildClient({})
        console.log({ client })
        expect(client.defaults.baseURL).toEqual('/')
    })
})
