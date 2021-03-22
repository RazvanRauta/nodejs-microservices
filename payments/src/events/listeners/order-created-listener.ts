/**
 * @ @author: Razvan Rauta
 * @ Date: Mar 20 2021
 * @ Time: 11:44
 */

import {
    Listener,
    OrderCreatedEvent,
    OrderStatus,
    Subjects,
} from '@rrazvan.dev/ticketing-common'
import { Message } from 'node-nats-streaming'

import { Order } from '../../models/order'
import { AwaitingPaymentPublisher } from '../publishers/awaiting-payment-publisher'
import { QUEUE_GROUP_NAME } from './queue-group-name'

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
    subject: Subjects.OrderCreated = Subjects.OrderCreated
    queueGroupName = QUEUE_GROUP_NAME

    async onMessage(data: OrderCreatedEvent['data'], msg: Message) {
        const order = Order.build({
            id: data.id,
            price: data.ticket.price,
            status: OrderStatus.AwaitingPayment,
            userId: data.userId,
            version: data.version,
        })

        await order.save()

        await new AwaitingPaymentPublisher(this.client).publish({
            orderId: order.id,
            version: order.version,
            status: order.status,
        })

        msg.ack()
    }
}
