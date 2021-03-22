import capitalize from 'lodash/capitalize'
import React from 'react'
import { Container, Table } from 'react-bootstrap'

const textColor = {
    created: 'text-info',
    cancelled: 'text-danger',
    complete: 'text-success',
    'awaiting:payment': 'text-warning',
}

const MyOrders = ({ orders }) => {
    const ordersList = orders.map((order) => {
        return (
            <tr key={order.id}>
                <td>{order.ticket.title}</td>
                <td>${order.ticket.price}</td>
                <td className={textColor[order.status]}>
                    {capitalize(order.status.split(':').join(' '))}
                </td>
            </tr>
        )
    })

    return (
        <Container fluid="sm">
            <h1>My Orders</h1>
            <Table>
                <thead>
                    <tr>
                        <th>Ticket Title</th>
                        <th>Ticket Price</th>
                        <th>Order Status</th>
                    </tr>
                </thead>
                <tbody>{ordersList}</tbody>
            </Table>
        </Container>
    )
}

MyOrders.getInitialProps = async (ctx, client) => {
    const { data } = await client.get(`/api/orders`)

    return { orders: data }
}

export default MyOrders
