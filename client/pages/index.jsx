import buildClient from '../api/build-client'

const LandingPage = ({ currentUser }) => {
    console.log({ currentUser })

    return <h1>You are{!currentUser ? ' NOT' : ''} signed in</h1>
}

LandingPage.getInitialProps = async (ctx) => {
    const { data } = await buildClient(ctx).get('/api/users/currentuser')
    return data
}

export default LandingPage
