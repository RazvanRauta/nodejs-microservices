import React from 'react'
import { render } from '@testing-library/react'
import LandingPage from '../'
import buildClient from '../../api/build-client'

const client = buildClient({})

describe('Testing Landing page', () => {
    it('should render heading', async () => {
        const data = await LandingPage.getInitialProps(null, client)
        const { getByTestId } = render(<LandingPage {...data} />)
        const availableTickets = getByTestId('available-tickets')
        expect(availableTickets).toBeInTheDocument()
    })

    it('should render no tickets message', async () => {
        const { getByTestId } = render(<LandingPage tickets={[]} />)
        const noTickets = getByTestId('no-tickets')
        expect(noTickets).toBeInTheDocument()
    })

    it('should render table with 3 tickets', async () => {
        const data = await LandingPage.getInitialProps(null, client)
        const { getByTestId, queryByTestId } = render(<LandingPage {...data} />)
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
