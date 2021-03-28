import React, { useEffect } from 'react'
import useRequest from '@/hooks/use-request'
import { useRouter } from 'next/router'
import { Container } from '@chakra-ui/layout'
import SEO from '@/components/SEO'

const SignOut = () => {
    const router = useRouter()
    const { doRequest, errors } = useRequest({
        url: '/api/users/signout',
        method: 'post',
        body: {},
        onSuccess: () => router.push('/'),
    })

    useEffect(() => {
        doRequest()
    }, [])

    return (
        <>
            <SEO title="Sign Out" />
            <Container>
                Signing you out.. <br /> {errors}
            </Container>
        </>
    )
}

export default SignOut
