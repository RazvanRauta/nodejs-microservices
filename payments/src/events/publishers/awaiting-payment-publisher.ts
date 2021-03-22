/**
 * @author: Razvan Rauta
 * Date: Mar 22 2021
 * Time: 21:35
 */

import {
    Publisher,
    Subjects,
    AwaitingPaymentEvent,
} from '@rrazvan.dev/ticketing-common'

export class AwaitingPaymentPublisher extends Publisher<AwaitingPaymentEvent> {
    subject: Subjects.AwaitingPayment = Subjects.AwaitingPayment
}
