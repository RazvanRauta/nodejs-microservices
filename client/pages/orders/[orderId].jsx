import { useState, useEffect } from 'react'
import { Container } from 'react-bootstrap'
import StripeCheckout from 'react-stripe-checkout'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/router'

import { getUser } from '@/redux/user/selectors'
import useRequest from 'hooks/use-request'

const OrderPreview = ({ order }) => {
    const [timeLeft, setTimeLeft] = useState(null)
    const currentUser = useSelector((state) => getUser(state))
    const router = useRouter()

    const { doRequest, errors } = useRequest({
        url: '/api/payments',
        method: 'post',
        body: {
            orderId: order.id,
        },
        onSuccess: () => router.push('/orders'),
    })

    useEffect(() => {
        let intervalId
        const findTimeLeft = () => {
            const msLeft = new Date(order.expiresAt) - new Date()
            if (msLeft > 0) {
                setTimeLeft(Math.round(msLeft / 1000))
            } else {
                setTimeLeft(null)
                clearInterval(intervalId)
            }
        }

        findTimeLeft()
        intervalId = setInterval(findTimeLeft, 1 * 1000)

        return () => {
            clearInterval(intervalId)
        }
    }, [])

    return (
        <Container fluid="sm">
            {timeLeft ? (
                <p>
                    Time left to pay: {timeLeft} seconds {currentUser.email}
                </p>
            ) : (
                <p>Order expired! Pls make the order again.</p>
            )}
            {timeLeft ? (
                <StripeCheckout
                    token={({ id }) => doRequest({ token: id })}
                    stripeKey={process.env.stripePublicKey}
                    amount={order.ticket.price * 100}
                    email={currentUser.email}
                    description={`Payment for ticket: ${order.ticket.title}`}
                />
            ) : null}
            {errors}
        </Container>
    )
}

OrderPreview.getInitialProps = async (ctx, client) => {
    const { orderId } = ctx.query

    const { data } = await client.get(`/api/orders/${orderId}`)

    return { order: data }
}

export default OrderPreview
