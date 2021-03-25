import React from 'react'
import { useRouter } from 'next/router'
import useRequest from '@/hooks/use-request'
import { Field, Form, Formik } from 'formik'
import { Container, Heading } from '@chakra-ui/layout'
import { FormControl, FormLabel } from '@chakra-ui/form-control'
import { Input } from '@chakra-ui/input'
import { Button } from '@chakra-ui/button'

const NewTicket = () => {
    const router = useRouter()

    const { doRequest, errors } = useRequest({
        url: '/api/tickets',
        method: 'post',
        body: {},
        onSuccess: () => router.push('/'),
    })

    const onSubmit = async (values, actions) => {
        await doRequest(values)
        actions.setSubmitting(false)
    }

    const onBlur = (price) => {
        const value = parseFloat(price)

        if (isNaN(value)) {
            return 0
        }

        return value.toFixed(2)
    }

    return (
        <Container maxW={'container.md'}>
            <Heading data-testid="add-new" mb={6} size={'xl'} as={'h2'}>
                Add new ticket
            </Heading>
            <Formik
                onSubmit={onSubmit}
                initialValues={{
                    title: '',
                    price: '',
                }}>
                {(props) => (
                    <Form>
                        <Field name="title" type="text">
                            {({ field }) => (
                                <FormControl>
                                    <FormLabel htmlFor="title">Title</FormLabel>
                                    <Input
                                        {...field}
                                        id="title"
                                        placeholder="Enter title"
                                    />
                                </FormControl>
                            )}
                        </Field>
                        <Field name="price" type="number">
                            {({ field }) => {
                                return (
                                    <FormControl mt={3}>
                                        <FormLabel htmlFor="price">
                                            Password
                                        </FormLabel>
                                        <Input
                                            {...field}
                                            id="price"
                                            placeholder="Enter price"
                                            onBlur={(event) => {
                                                const formatted = onBlur(
                                                    props.values['price']
                                                )
                                                props.setFieldValue(
                                                    'price',
                                                    formatted
                                                )
                                                props.handleBlur(event)
                                            }}
                                        />
                                    </FormControl>
                                )
                            }}
                        </Field>
                        {errors}
                        <Button
                            mt={4}
                            colorScheme="teal"
                            isLoading={props.isSubmitting}
                            type="submit">
                            Create
                        </Button>
                    </Form>
                )}
            </Formik>
        </Container>
    )
}

export default NewTicket
