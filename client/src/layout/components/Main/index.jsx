import { Container } from '@chakra-ui/layout'
import React, { Fragment } from 'react'

const Main = ({ children }) => {
    return (
        <Container as="main" maxW="container.lg" pt="40px" centerContent>
            <Fragment>{children}</Fragment>
        </Container>
    )
}

export default Main
