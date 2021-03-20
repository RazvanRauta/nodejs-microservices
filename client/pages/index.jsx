import Link from 'next/link'
import { Container, Table, NavLink } from 'react-bootstrap'

const LandingPage = ({ tickets }) => {
    const ticketList = tickets.map((ticket) => {
        return (
            <tr key={ticket.id}>
                <td>{ticket.title}</td>
                <td>${ticket.price}</td>
                <td>
                    <Link
                        href="/tickets/[ticketId]"
                        as={`/tickets/${ticket.id}`}
                        passHref>
                        <NavLink>View</NavLink>
                    </Link>
                </td>
            </tr>
        )
    })

    return (
        <Container fluid="sm">
            <h1>Tickets</h1>
            <Table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Price</th>
                        <th>Link</th>
                    </tr>
                </thead>
                <tbody>{ticketList}</tbody>
            </Table>
        </Container>
    )
}

LandingPage.getInitialProps = async (context, client) => {
    const { data } = await client.get('/api/tickets')

    return { tickets: data }
}

export default LandingPage
