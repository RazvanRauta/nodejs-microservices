/**
 * @author: Razvan Rauta
 * Date: Oct 03 2020
 * Time: 14:59
 */

import { OrderCreatedListener } from './events/listeneres/order-created-listener'
import { natsWrapper } from './nats-wrapper'

/**
 * Start to listen after connection to MongoDB is successfully
 */
const start = async () => {
    if (!process.env.NATS_CLIENT_ID) {
        throw new Error('NATS_CLIENT_ID is not defined')
    }

    if (!process.env.NATS_URL) {
        throw new Error('NATS_URL is not defined')
    }

    if (!process.env.NATS_CLUSTER_ID) {
        throw new Error('NATS_CLUSTER_ID is not defined')
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

        new OrderCreatedListener(natsWrapper.client).listen()
    } catch (err) {
        console.log(err)
    }
}

start()
