import { ChakraProvider } from '@chakra-ui/react'

import buildClient from '@/api/build-client'
import { removeUser, setUser } from '@/redux/user/action'
import { wrapper } from '@/redux/store'
import { theme } from 'src/theme'
import { Fonts } from 'src/theme/fonts'
import Layout from '@/layout'

const MyApp = ({ Component, pageProps }) => {
    return (
        <ChakraProvider theme={theme} resetCSS>
            <Fonts />
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </ChakraProvider>
    )
}

MyApp.getInitialProps = async ({ Component, ctx }) => {
    const client = buildClient(ctx)

    try {
        const { data } = await client.get('/api/users/currentuser')

        if (data) {
            const { currentUser } = data

            ctx.store.dispatch(setUser(currentUser))
        } else {
            ctx.store.dispatch(removeUser())
        }
    } catch (err) {
        console.log('Error thrown while trying to fetch current user')
    }

    return {
        pageProps: {
            // Call page-level getInitialProps
            ...(Component.getInitialProps
                ? await Component.getInitialProps(ctx, client)
                : {}),
            // Some custom thing for all pages
            pathname: ctx.pathname,
        },
    }
}

export default wrapper.withRedux(MyApp)
