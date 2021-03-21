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
import { Ticket } from '../../models/ticket'
import { TicketUpdatedPublisher } from '../publishers/ticket-updated-publisher'
import { QUEUE_GROUP_NAME } from './queue-group-name'

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
    subject: Subjects.OrderCreated = Subjects.OrderCreated
    queueGroupName = QUEUE_GROUP_NAME

    async onMessage(data: OrderCreatedEvent['data'], msg: Message) {
        // Find the ticket that the order is reserving
        const ticket = await Ticket.findById(data.ticket.id)

        // If no ticket, throw error
        if (!ticket) {
            throw new Error('Ticket not found')
        }

        // Mark the ticket as being reserved by setting its orderId property
        ticket.set({ orderId: data.id })

        // Save the ticket
        await ticket.save()

        // Publish event
        await new TicketUpdatedPublisher(this.client).publish({
            id: ticket.id,
            price: ticket.price,
            title: ticket.title,
            version: ticket.version,
            userId: ticket.userId,
            orderId: ticket.orderId,
        })

        // ack the message
        msg.ack()
    }
}
