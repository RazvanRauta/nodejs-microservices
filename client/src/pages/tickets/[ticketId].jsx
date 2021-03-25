import { useRouter } from 'next/router'
import React from 'react'
import { Container, Heading, Text } from '@chakra-ui/layout'
import { Button } from '@chakra-ui/button'
import useRequest from '@/hooks/use-request'

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
        <Container>
            <Heading data-testid="ticket-title" mb={6} size={'xl'} as={'h2'}>
                {ticket.title}
            </Heading>
            <Text>Price: ${ticket.price}</Text>
            {errors}
            <Button
                type="submit"
                mt="20px"
                colorScheme="teal"
                onClick={() => doRequest()}>
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
