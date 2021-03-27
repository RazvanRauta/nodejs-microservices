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
                        <Link textColor="blue.300">View</Link>
                    </NextLink>
                </Td>
            </Tr>
        )
    })

    return (
        <Container>
            <Heading data-testid="available-tickets" size={'2xl'} as={'h2'}>
                Available Tickets
            </Heading>
            {tickets && tickets.length ? (
                <Table mt="40px" data-testid="tickets-table">
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
                    No tickets are available. Pls create some:{' '}
                    <NextLink href="/tickets/new" passHref>
                        <Link fontSize="20px" textColor="blue.300">
                            Sell Tickets
                        </Link>
                    </NextLink>
                </Heading>
            )}
        </Container>
    )
}

LandingPage.getInitialProps = async (context, client) => {
    try {
        const { data } = await client.get('/api/tickets')
        return { tickets: data }
    } catch (err) {
        console.log('Error while trying to fetch tickets')
    }
    return { tickets: [] }
}

export default LandingPage
