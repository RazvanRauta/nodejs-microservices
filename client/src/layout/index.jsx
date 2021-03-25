import React, { Fragment } from 'react'

import Footer from './components/Footer'
import Header from './components/Header'
import Main from './components/Main'

const Layout = ({ children }) => {
    return (
        <Fragment>
            <Header />
            <Main>{children}</Main>
            <Footer />
        </Fragment>
    )
}

export default Layout
