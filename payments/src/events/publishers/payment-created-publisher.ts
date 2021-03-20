/**
 * @author: Razvan Rauta
 * Date: Mar 20 2021
 * Time: 19:36
 */

import {
    Publisher,
    Subjects,
    PaymentCreatedEvent,
} from '@rrazvan.dev/ticketing-common'

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
    subject: Subjects.PaymentCreated = Subjects.PaymentCreated
}
