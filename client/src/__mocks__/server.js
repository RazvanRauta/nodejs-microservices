import { rest } from 'msw'
import { setupServer } from 'msw/node'

const handlers = [
    rest.get('/api/tickets', (req, res, ctx) => {
        console.log(req)
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
    }),
]

// This configures a request mocking server with the given request handlers.
const server = setupServer(...handlers)

export { server, rest }
