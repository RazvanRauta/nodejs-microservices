import {
    Listener,
    UserCreatedEvent,
    Subjects,
} from '@rrazvan.dev/ticketing-common'
import { Message } from 'node-nats-streaming'
import { sendWelcomeEmail } from '../../send-email'

import { QUEUE_GROUP_NAME } from './queue-group-name'

export class UserCreatedListener extends Listener<UserCreatedEvent> {
    subject: Subjects.UserCreated = Subjects.UserCreated
    queueGroupName = QUEUE_GROUP_NAME

    async onMessage(data: UserCreatedEvent['data'], msg: Message) {
        const email = data.email

        console.log('Sending Welcome email')

        const response = await sendWelcomeEmail({ to: email })

        console.log(response)

        msg.ack()
    }
}
