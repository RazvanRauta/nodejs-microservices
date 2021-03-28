import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import { Container, Heading } from '@chakra-ui/layout'
import { Button } from '@chakra-ui/react'

import useRequest from '@/hooks/use-request'
import { setUser } from '@/redux/user/action'
import { Form, Formik } from 'formik'
import FormInput from '@/components/FormInput'
import SEO from '@/components/SEO'

const SignUp = () => {
    const dispatch = useDispatch()
    const router = useRouter()

    const { doRequest, errors } = useRequest({
        url: '/api/users/signup',
        method: 'post',
        body: {},
        onSuccess: (data) => {
            dispatch(setUser(data))
            router.push('/')
        },
    })

    const onSubmit = async (values, actions) => {
        await doRequest(values)
        actions.setSubmitting(false)
    }

    return (
        <>
            <SEO title="Sign Up" />
            <Container maxW={'container.md'}>
                <Heading data-testid="sign-up" mb={6} size={'xl'} as={'h2'}>
                    Sign Up
                </Heading>
                <Formik
                    initialValues={{ email: '', password: '' }}
                    onSubmit={onSubmit}>
                    {(props) => (
                        <Form>
                            <FormInput
                                name="email"
                                type="email"
                                placeholder="Enter email"
                                label="Email Address"
                            />
                            <FormInput
                                name="password"
                                type="password"
                                placeholder="Password"
                                label="Password"
                            />
                            {errors}
                            <Button
                                mt={4}
                                colorScheme="teal"
                                isLoading={props.isSubmitting}
                                type="submit">
                                Sign Up
                            </Button>
                        </Form>
                    )}
                </Formik>
            </Container>
        </>
    )
}

export default SignUp
