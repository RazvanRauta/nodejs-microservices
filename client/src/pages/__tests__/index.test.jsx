import { render, server, rest } from '@/test/test-utils'
import { makeTestStore } from '@/__mocks__/store'
import React from 'react'
import LandingPage from '../'
import buildClient from '../../api/build-client'

const client = buildClient({})
let store
describe('Testing Landing page', () => {
    // Establish API mocking before all tests.
    beforeAll(() => {
        server.listen()
    })

    beforeEach(() => {
        store = makeTestStore()
    })
    afterEach(() => server.resetHandlers())

    afterAll(() => server.close())

    it('should render heading', async () => {
        server.use(
            rest.get('/api/tickets', (req, res, ctx) => {
                return res(ctx.status(200), ctx.json([]))
            })
        )
        const data = await LandingPage.getInitialProps(null, client)
        const { getByTestId } = render(<LandingPage {...data} />, { store })
        const availableTickets = getByTestId('available-tickets')
        expect(availableTickets).toBeInTheDocument()
    })

    it('should render no tickets message', async () => {
        const { getByTestId } = render(<LandingPage tickets={[]} />, { store })
        const noTickets = getByTestId('no-tickets')
        expect(noTickets).toBeInTheDocument()
    })

    it('should render table with 3 tickets', async () => {
        server.use(
            rest.get('/api/tickets', (req, res, ctx) => {
                return res(
                    ctx.status(200),
                    ctx.json([
                        {
                            title: 'title one',
                            price: 12,
                            id: 1,
                        },
                        {
                            title: 'title two',
                            price: 17,
                            id: 2,
                        },
                        {
                            title: 'title three',
                            price: 19,
                            id: 3,
                        },
                    ])
                )
            })
        )
        const data = await LandingPage.getInitialProps(null, client)
        const { getByTestId, queryByTestId } = render(
            <LandingPage {...data} />,
            { store }
        )
        const ticketTable = getByTestId('tickets-table')
        const ticket1 = getByTestId('ticket-1')
        const ticket2 = getByTestId('ticket-2')
        const ticket3 = getByTestId('ticket-3')
        const ticket4 = queryByTestId('ticket-4')

        expect(ticketTable).toBeInTheDocument()
        expect(ticket1).toBeInTheDocument()
        expect(ticket2).toBeInTheDocument()
        expect(ticket3).toBeInTheDocument()
        expect(ticket4).toBeNull()
    })
})
