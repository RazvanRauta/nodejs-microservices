import { useSelector } from 'react-redux'
import { getUser } from '@/redux/user/selectors'
import isNull from 'lodash/isNull'

const LandingPage = () => {
    const currentUser = useSelector((state) => getUser(state))
    return (
        <>
            <h1>You are{isNull(currentUser) ? ' NOT' : ''} signed in</h1>
            {currentUser && <h2>Hello {currentUser.email}</h2>}
        </>
    )
}

export default LandingPage
