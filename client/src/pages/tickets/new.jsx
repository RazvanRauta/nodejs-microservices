import React from 'react'
import { useRouter } from 'next/router'
import useRequest from '@/hooks/use-request'
import { Form, Formik } from 'formik'
import { Container, Heading } from '@chakra-ui/layout'
import { Button } from '@chakra-ui/button'
import FormInput from '@/components/FormInput'
import SEO from '@/components/SEO'

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

    const onBlurPrice = ({ values, setFieldValue, handleBlur }, event) => {
        const value = parseFloat(values['price'])

        if (isNaN(value)) {
            return ''
        }
        setFieldValue('price', value.toFixed(2))
        handleBlur(event)
    }

    return (
        <>
            <SEO title="Add new ticket" />
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
                            <FormInput
                                name="title"
                                type="text"
                                placeholder="Enter title"
                                label="Title"
                            />
                            <FormInput
                                name="price"
                                type="number"
                                placeholder="Enter price"
                                label="Price"
                                formProps={props}
                                onBlur={onBlurPrice}
                            />
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
        </>
    )
}

export default NewTicket
