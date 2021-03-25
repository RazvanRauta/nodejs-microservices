import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import { Container, Heading } from '@chakra-ui/layout'
import { FormControl, FormLabel, Input, Button } from '@chakra-ui/react'

import useRequest from '@/hooks/use-request'
import { setUser } from '@/redux/user/action'
import { Field, Form, Formik } from 'formik'

const SignIn = () => {
    const dispatch = useDispatch()
    const router = useRouter()

    const { doRequest, errors } = useRequest({
        url: '/api/users/signin',
        method: 'post',
        body: {},
        onSuccess: (data) => {
            dispatch(setUser(data))
            router.push('/')
        },
    })

    console.log({ errors })

    const onSubmit = async (values, actions) => {
        await doRequest(values)
        actions.setSubmitting(false)
    }

    return (
        <Container size="container.md" mt={10}>
            <Heading data-testid="sign-in" mb={6} size={'xl'} as={'h2'}>
                Sign In
            </Heading>
            <Formik
                initialValues={{ email: '', password: '' }}
                onSubmit={onSubmit}>
                {(props) => (
                    <Form>
                        <Field name="email" type="email">
                            {({ field }) => (
                                <FormControl>
                                    <FormLabel htmlFor="email">
                                        Email address
                                    </FormLabel>
                                    <Input
                                        {...field}
                                        id="email"
                                        placeholder="Enter email"
                                    />
                                </FormControl>
                            )}
                        </Field>
                        <Field name="password" type="password">
                            {({ field }) => (
                                <FormControl mt={3}>
                                    <FormLabel htmlFor="password">
                                        Password
                                    </FormLabel>
                                    <Input
                                        {...field}
                                        id="password"
                                        placeholder="Password"
                                        type="password"
                                    />
                                </FormControl>
                            )}
                        </Field>
                        {errors}
                        <Button
                            mt={4}
                            colorScheme="teal"
                            isLoading={props.isSubmitting}
                            type="submit">
                            Sign In
                        </Button>
                    </Form>
                )}
            </Formik>
        </Container>
    )
}

export default SignIn
