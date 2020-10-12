import { useState } from 'react'
import { Form, Button, Container } from 'react-bootstrap'
import Router from 'next/router'

import useRequest from '../../hooks/use-request'

const SignUp = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const { doRequest, errors } = useRequest({
        url: '/api/users/signup',
        method: 'post',
        body: {
            email,
            password,
        },
        onSuccess: () => Router.push('/'),
    })

    const onSubmit = async (event) => {
        event.preventDefault()
        await doRequest()
    }

    return (
        <Container fluid="sm">
            <Form style={{ maxWidth: '70%', margin: '0 auto' }} onSubmit={onSubmit}>
                <h1>Sign Up</h1>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        placeholder="Enter email"
                    />
                    <Form.Text className="text-muted">
                        We&apos;ll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        placeholder="Password"
                    />
                </Form.Group>
                {errors}
                <Button variant="primary" type="submit">
                    Sign Up
                </Button>
            </Form>
        </Container>
    )
}

export default SignUp
