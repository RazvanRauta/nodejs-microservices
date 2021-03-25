import React from 'react'
import { Text, Link } from '@chakra-ui/react'

const Copyright = () => {
    return (
        <Text fontSize="md">
            {'Copyright © '}
            <Link color="inherit" href="https://rrazvan.dev" target="_blank">
                RRazvan
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Text>
    )
}

export default Copyright
