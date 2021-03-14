import {
    Publisher,
    Subjects,
    TicketUpdatedEvent,
} from '@rrazvan.dev/ticketing-common'

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
    subject: Subjects.TicketUpdated = Subjects.TicketUpdated
}
