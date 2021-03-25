import React from 'react'
import { useSelector } from 'react-redux'
import { Box, Flex, Heading, Spacer, Stack } from '@chakra-ui/react'
import NextLink from 'next/link'

import NavLink from '../NavLink'
import { getUser } from '@/redux/user/selectors'

const Header = () => {
    const currentUser = useSelector((state) => getUser(state))

    const links = [
        !currentUser && { label: 'Sign Up', href: '/auth/signup' },
        !currentUser && { label: 'Sign In', href: '/auth/signin' },
        currentUser && { label: 'Sell Tickets', href: '/tickets/new' },
        currentUser && { label: 'My Orders', href: '/orders' },
        currentUser && { label: 'Sign Out', href: '/auth/signout' },
    ]
        .filter((link) => link)
        .map(({ label, href }) => (
            <NavLink key={href} label={label} href={href} />
        ))

    return (
        <Flex p="1" bgGradient="linear(to-l, #7928CA,#FF0080)" color="teal.400">
            <Box p="2">
                <Heading size="lg">
                    <NextLink href="/" passHref>
                        <Box color="#7928CA" as="a">
                            GetTix
                        </Box>
                    </NextLink>
                </Heading>
            </Box>
            <Spacer />
            <Stack
                flex={1}
                justify={'flex-end'}
                direction={'row'}
                spacing={6}
                align={'center'}>
                {links}
            </Stack>
        </Flex>
    )
}

export default Header
