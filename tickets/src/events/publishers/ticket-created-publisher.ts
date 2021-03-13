import {
    Publisher,
    Subjects,
    TicketCreatedEvent,
} from '@rrazvan.dev/ticketing-common'

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
    subject: Subjects.TicketCreated = Subjects.TicketCreated
}
