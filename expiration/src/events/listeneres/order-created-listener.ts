/**
 * @ @author: Razvan Rauta
 * @ Date: Mar 15 2021
 * @ Time: 22:28
 */

import {
    Listener,
    OrderCreatedEvent,
    Subjects,
} from '@rrazvan.dev/ticketing-common'
import { Message } from 'node-nats-streaming'
import { expirationQueue } from '../../queues/expiration-queue'
import { QUEUE_GROUP_NAME } from './queue-group-name'

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
    subject: Subjects.OrderCreated = Subjects.OrderCreated
    queueGroupName = QUEUE_GROUP_NAME

    async onMessage(data: OrderCreatedEvent['data'], msg: Message) {
        const delay = new Date(data.expiresAt).getTime() - new Date().getTime()

        await expirationQueue.add(
            {
                orderId: data.id,
            },
            { delay }
        )

        msg.ack()
    }
}
