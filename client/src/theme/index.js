// 1. Import the extendTheme function
import { extendTheme } from '@chakra-ui/react'
// 2. Extend the theme to include custom colors, fonts, etc
const colors = {
    getTix: {
        purple: '#7928CA',
        pink: '#FF0080',
    },
}
export const theme = extendTheme({
    styles: {
        global: {
            'html, body': {
                color: 'gray.600',
            },
            a: {
                color: 'teal.500',
                _hover: {
                    textDecoration: 'none',
                },
            },
            '#__next': {
                display: 'flex',
                flexDirection: 'column',
                minHeight: '100vh',
            },
            footer: {
                textAlign: 'center',
                marginTop: 'auto',
            },
        },
    },
    colors,
    fonts: {
        body: 'Montserrat',
        heading: 'Montserrat',
    },
    config: {
        cssVarPrefix: 'rr',
    },
})
