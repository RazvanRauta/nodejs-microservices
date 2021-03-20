/**
 * @author: Razvan Rauta
 * Date: Mar 14 2021
 * Time: 22:33
 */

import {
    Publisher,
    OrderCreatedEvent,
    Subjects,
} from '@rrazvan.dev/ticketing-common'

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
    subject: Subjects.OrderCreated = Subjects.OrderCreated
}
