import { Message } from 'node-nats-streaming'
import {
    Subjects,
    Listener,
    AwaitingPaymentEvent,
    OrderStatus,
} from '@rrazvan.dev/ticketing-common'
import { QUEUE_GROUP_NAME } from './queue-group-name'
import { Order } from '../../models/order'

export class AwaitingPaymentListener extends Listener<AwaitingPaymentEvent> {
    subject: Subjects.AwaitingPayment = Subjects.AwaitingPayment
    queueGroupName = QUEUE_GROUP_NAME

    async onMessage(data: AwaitingPaymentEvent['data'], msg: Message) {
        const order = await Order.findById({
            _id: data.orderId,
            version: data.version - 1,
        })

        if (!order) {
            throw new Error('Order not found')
        }

        order.set({
            status: OrderStatus.AwaitingPayment,
        })

        await order.save()

        msg.ack()
    }
}
