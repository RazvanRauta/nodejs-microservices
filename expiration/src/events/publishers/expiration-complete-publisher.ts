/**
 * @author: Razvan Rauta
 * Date: Mar 14 2021
 * Time: 22:33
 */

import {
    Publisher,
    ExpirationCompleteEvent,
    Subjects,
} from '@rrazvan.dev/ticketing-common'

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
    subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete
}
