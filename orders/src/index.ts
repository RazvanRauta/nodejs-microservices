/**
 * @author: Razvan Rauta
 * Date: Mar 14 2021
 * Time: 12:54
 */

import mongoose from 'mongoose'
import { app } from './app'
import { ExpirationCompleteListener } from './events/listeners/expiration-complete-listener'
import { PaymentCreatedListener } from './events/listeners/payments-created-listener'
import { TicketCreatedListener } from './events/listeners/ticket-created-listener'
import { TicketUpdatedListener } from './events/listeners/ticket-updated-listener'

import { natsWrapper } from './nats-wrapper'

/**
 * Start to listen after connection to MongoDB is successfully
 */
const start = async () => {
    console.log('Starting....')

    if (!process.env.JWT_KEY) {
        throw new Error('JWT_KEY is not defined')
    }

    if (!process.env.MONGO_URI) {
        throw new Error('MONGO_URI is not defined')
    }

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

        new TicketCreatedListener(natsWrapper.client).listen()
        new TicketUpdatedListener(natsWrapper.client).listen()
        new ExpirationCompleteListener(natsWrapper.client).listen()
        new PaymentCreatedListener(natsWrapper.client).listen()

        // * Connect to MongoDB
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
        })
        console.log('Connected to MongoDB')
    } catch (err) {
        console.log(err)
    }

    /**
     * Start listening
     */
    app.listen(3000, () => console.log('Listening on port 3000!'))
}

start()
