import useRequest from 'hooks/use-request'
import React, { useState } from 'react'
import { Form, Button, Container } from 'react-bootstrap'
import { useRouter } from 'next/router'

const NewTicket = () => {
    const [title, setTitle] = useState('')
    const [price, setPrice] = useState('')

    const router = useRouter()

    const { doRequest, errors } = useRequest({
        url: '/api/tickets',
        method: 'post',
        body: {
            title,
            price,
        },
        onSuccess: () => router.push('/'),
    })

    const onSubmit = async (event) => {
        event.preventDefault()
        await doRequest()
    }

    const onBlur = () => {
        const value = parseFloat(price)

        if (isNaN(value)) {
            return
        }

        setPrice(value.toFixed(2))
    }

    return (
        <Container fluid="sm">
            <Form
                style={{ maxWidth: '70%', margin: '0 auto' }}
                onSubmit={onSubmit}>
                <h1>Create Ticket</h1>
                <Form.Group controlId="formBasicTicketTitle">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        type="text"
                        placeholder="Enter ticket title"
                    />
                </Form.Group>

                <Form.Group controlId="formBasicTicketPrice">
                    <Form.Label>Price</Form.Label>
                    <Form.Control
                        value={price}
                        onBlur={onBlur}
                        onChange={(e) => setPrice(e.target.value)}
                        type="numeric"
                        placeholder="Enter ticket price"
                    />
                </Form.Group>
                {errors ? errors : null}
                <Button variant="primary" type="submit">
                    Create
                </Button>
            </Form>
        </Container>
    )
}

export default NewTicket
