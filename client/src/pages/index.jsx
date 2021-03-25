import NextLink from 'next/link'
import { Heading, Container, Link } from '@chakra-ui/layout'
import { Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react'

const LandingPage = ({ tickets }) => {
    const ticketList = tickets.map((ticket) => {
        return (
            <Tr key={ticket.id} data-testid={`ticket-${ticket.id}`}>
                <Td>{ticket.title}</Td>
                <Td>${ticket.price}</Td>
                <Td>
                    <NextLink
                        href="/tickets/[ticketId]"
                        as={`/tickets/${ticket.id}`}
                        passHref>
                        <Link>View</Link>
                    </NextLink>
                </Td>
            </Tr>
        )
    })

    return (
        <Container>
            <Heading
                data-testid="available-tickets"
                mt={3}
                size={'2xl'}
                as={'h2'}>
                Available Tickets
            </Heading>
            {tickets && tickets.length ? (
                <Table data-testid="tickets-table">
                    <Thead>
                        <Tr>
                            <Th>Title</Th>
                            <Th>Price</Th>
                            <Th>Link</Th>
                        </Tr>
                    </Thead>
                    <Tbody>{ticketList}</Tbody>
                </Table>
            ) : (
                <Heading data-testid="no-tickets" as={'h4'} mt={6} size={'lg'}>
                    No tickets are available. Pls create some.
                </Heading>
            )}
        </Container>
    )
}

LandingPage.getInitialProps = async (context, client) => {
    const { data } = await client.get('/api/tickets')

    return { tickets: data }
}

export default LandingPage
