import { Link } from '@chakra-ui/layout'
import NextLink from 'next/link'

const NavLink = ({ href, label }) => (
    <NextLink href={href} passHref>
        <Link
            px={2}
            py={1}
            maxH={'max-content'}
            rounded={'md'}
            border="1px transparent solid"
            fontWeight="semibold"
            _hover={{
                textDecoration: 'none',
                borderColor: 'teal.200',
                borderWidth: '1px',
            }}
            _focus={{
                borderColor: 'teal.400',
                borderWidth: '3px',
            }}>
            {label}
        </Link>
    </NextLink>
)
export default NavLink
