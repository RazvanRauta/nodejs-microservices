/* eslint-disable */

import App from 'next/app'
import 'bootstrap/dist/css/bootstrap.min.css'
import buildClient from '@/api/build-client'
import { removeUser, setUser } from '@/redux/user/action'
import { wrapper } from '@/redux/store'
import Header from '@/components/Header'

const MyApp = ({ Component, pageProps }) => {
    return (
        <>
            <Header />
            <Component {...pageProps} />
        </>
    )
}

MyApp.getInitialProps = async ({ Component, ctx }) => {
    const { data } = await buildClient(ctx).get('/api/users/currentuser')

    if (data) {
        const { currentUser } = data

        ctx.store.dispatch(setUser(currentUser))
    } else {
        ctx.store.dispatch(removeUser())
    }

    return {
        pageProps: {
            // Call page-level getInitialProps
            ...(Component.getInitialProps ? await Component.getInitialProps(ctx) : {}),
            // Some custom thing for all pages
            pathname: ctx.pathname,
        },
    }
}

export default wrapper.withRedux(MyApp)