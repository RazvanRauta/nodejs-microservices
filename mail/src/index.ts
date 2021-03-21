/**
 * @author: Razvan Rauta
 * Date: Oct 03 2020
 * Time: 14:59
 */

import { UserCreatedListener } from './events/listeners/user-created-listener'
import { PaymentCreatedListener } from './events/listeners/payment-created-listener'
import { natsWrapper } from './nats-wrapper'

/**
 * Start to listen after connection to MongoDB is successfully
 */
const start = async () => {
    console.log('Starting....')

    if (!process.env.NATS_CLIENT_ID) {
        throw new Error('NATS_CLIENT_ID is not defined')
    }

    if (!process.env.NATS_URL) {
        throw new Error('NATS_URL is not defined')
    }

    if (!process.env.NATS_CLUSTER_ID) {
        throw new Error('NATS_CLUSTER_ID is not defined')
    }

    if (!process.env.MAILGUN_API_KEY) {
        throw new Error('MAILGUN_API_KEY is not defined')
    }

    if (!process.env.MAILGUN_DOMAIN) {
        throw new Error('MAILGUN_DOMAIN is not defined')
    }

    if (!process.env.MAILGUN_FROM) {
        throw new Error('MAILGUN_FROM is not defined')
    }

    try {
        // * Connect to NATS
        await natsWrapper.connect(
            process.env.NATS_CLUSTER_ID,
            process.env.NATS_CLIENT_ID,
            process.env.NATS_URL
        )

        // * Gracefully shutting down
        natsWrapper.client.on('close', () => {
            console.log('NATS connection closed')
            process.exit()
        })
        process.on('SIGINT', () => natsWrapper.client.close())
        process.on('SIGTERM', () => natsWrapper.client.close())

        new UserCreatedListener(natsWrapper.client).listen()
        new PaymentCreatedListener(natsWrapper.client).listen()
    } catch (err) {
        console.log(err)
    }
}

start()
