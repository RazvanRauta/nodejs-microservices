import { useState } from 'react'
import { Form, Button, Container } from 'react-bootstrap'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'

import useRequest from '@/hooks/use-request'
import { setUser } from '@/redux/user/action'

const SignIn = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()
    const router = useRouter()

    const { doRequest, errors } = useRequest({
        url: '/api/users/signin',
        method: 'post',
        body: {
            email,
            password,
        },
        onSuccess: (data) => {
            dispatch(setUser(data))
            router.push('/')
        },
    })

    const onSubmit = async (event) => {
        event.preventDefault()
        await doRequest()
    }

    return (
        <Container fluid="sm">
            <Form style={{ maxWidth: '70%', margin: '0 auto' }} onSubmit={onSubmit}>
                <h1>Sign In</h1>
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
                    Sign In
                </Button>
            </Form>
        </Container>
    )
}

export default SignIn