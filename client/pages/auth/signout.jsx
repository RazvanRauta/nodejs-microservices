import React, { useEffect } from 'react'
import useRequest from '@/hooks/use-request'
import { useRouter } from 'next/router'

const SignOut = () => {
    const router = useRouter()
    const { doRequest, errors } = useRequest({
        url: '/api/users/signout',
        method: 'post',
        body: {},
        onSuccess: () => router.push('/'),
    })

    // useEffect(() => {
    //     doRequest()
    // }, [])

    return (
        <div>
            Signing you out.. <br /> {errors}
        </div>
    )
}

export default SignOut
