import {
    Listener,
    PaymentCreatedEvent,
    Subjects,
} from '@rrazvan.dev/ticketing-common'
import { Message } from 'node-nats-streaming'

import { QUEUE_GROUP_NAME } from './queue-group-name'

export class PaymentCreatedListener extends Listener<PaymentCreatedEvent> {
    subject: Subjects.PaymentCreated = Subjects.PaymentCreated
    queueGroupName = QUEUE_GROUP_NAME

    async onMessage(data: PaymentCreatedEvent['data'], msg: Message) {
        console.log('Sending Payment email')

        // const response = await sendWelcomeEmail({ to: email })

        msg.ack()
    }
}
