/**
 * @ @author: Razvan Rauta
 * @ Date: Mar 20 2021
 * @ Time: 11:44
 */

import {
    Listener,
    OrderCreatedEvent,
    Subjects,
} from '@rrazvan.dev/ticketing-common'
import { Message } from 'node-nats-streaming'

import { Order } from '../../models/order'
import { QUEUE_GROUP_NAME } from './queue-group-name'

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
    subject: Subjects.OrderCreated = Subjects.OrderCreated
    queueGroupName = QUEUE_GROUP_NAME

    async onMessage(data: OrderCreatedEvent['data'], msg: Message) {
        const order = Order.build({
            id: data.id,
            price: data.ticket.price,
            status: data.status,
            userId: data.userId,
            version: data.version,
        })

        await order.save()

        msg.ack()
    }
}
