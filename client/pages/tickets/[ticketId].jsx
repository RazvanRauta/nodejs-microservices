import useRequest from 'hooks/use-request'
import { useRouter } from 'next/router'
import React from 'react'
import { Container, Button } from 'react-bootstrap'

const TicketPreview = ({ ticket }) => {
    const router = useRouter()

    const { doRequest, errors } = useRequest({
        url: '/api/orders',
        method: 'post',
        body: {
            ticketId: ticket.id,
        },
        onSuccess: (order) =>
            router.push('/orders/[orderId]', `/orders/${order.id}`),
    })

    return (
        <Container fluid="sm">
            <h1>{ticket.title}</h1>
            <h4>Price: ${ticket.price}</h4>
            {errors}
            <Button variant="primary" type="submit" onClick={() => doRequest()}>
                Purchase
            </Button>
        </Container>
    )
}

TicketPreview.getInitialProps = async (ctx, client) => {
    const { ticketId } = ctx.query

    const { data } = await client.get(`/api/tickets/${ticketId}`)

    return { ticket: data }
}

export default TicketPreview
