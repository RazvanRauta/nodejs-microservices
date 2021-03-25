import Copyright from '../Copyright'
import React from 'react'
import { Container, Flex } from '@chakra-ui/layout'

const Footer = () => {
    return (
        <Flex
            as="footer"
            p={3}
            bgGradient="linear(to-l, #7928CA,#FF0080)"
            color="gray.800"
            fontWeight="semibold">
            <Container maxW="sm" centerContent>
                <Copyright />
            </Container>
        </Flex>
    )
}

export default Footer
