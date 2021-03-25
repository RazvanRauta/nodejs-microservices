import capitalize from 'lodash/capitalize'
import React from 'react'
import { Heading, Container } from '@chakra-ui/layout'
import { Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react'

const textColor = {
    created: 'teal.500',
    cancelled: 'red.500',
    complete: 'green.500',
    'awaiting:payment': 'orange.500',
}

const MyOrders = ({ orders }) => {
    const ordersList = orders.map((order) => {
        return (
            <Tr key={order.id}>
                <Td>{order.ticket.title}</Td>
                <Td>${order.ticket.price}</Td>
                <Td textColor={textColor[order.status]} fontWeight="semibold">
                    {capitalize(order.status.split(':').join(' '))}
                </Td>
            </Tr>
        )
    })

    return (
        <Container>
            <Heading data-testid="my-orders" mb={6} size={'xl'} as={'h2'}>
                My Orders
            </Heading>
            <Table>
                <Thead>
                    <Tr>
                        <Th>Ticket Title</Th>
                        <Th>Ticket Price</Th>
                        <Th>Order Status</Th>
                    </Tr>
                </Thead>
                <Tbody>{ordersList}</Tbody>
            </Table>
        </Container>
    )
}

MyOrders.getInitialProps = async (ctx, client) => {
    const { data } = await client.get(`/api/orders`)

    return { orders: data }
}

export default MyOrders
