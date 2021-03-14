/**
 * @author: Razvan Rauta
 * Date: Mar 14 2021
 * Time: 22:33
 */

import {
    Publisher,
    OrderCancelledEvent,
    Subjects,
} from '@rrazvan.dev/ticketing-common'

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
    subject: Subjects.OrderCancelled = Subjects.OrderCancelled
}
