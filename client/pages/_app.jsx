/* eslint-disable */

import App from 'next/app'
import 'bootstrap/dist/css/bootstrap.min.css'
import buildClient from '@/api/build-client'
import { removeUser, setUser } from '@/redux/user/action'
import { wrapper } from '@/redux/store'
import Header from '@/components/Header'

class MyApp extends App {
    /*eslint-disable */
    static getInitialProps = async ({ Component, ctx }) => {
        const { data } = await buildClient(ctx).get('/api/users/currentuser')
        /*eslint-enable */

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

    render() {
        const { Component, pageProps } = this.props

        return (
            <>
                <Header />
                <Component {...pageProps} />
            </>
        )
    }
}

export default wrapper.withRedux(MyApp)
