/**
 * @ @author: Razvan Rauta
 * @ Date: Mar 21 2021
 * @ Time: 21:43
 */

import {
    Publisher,
    Subjects,
    UserCreatedEvent,
} from '@rrazvan.dev/ticketing-common'

export class UserCreatedPublisher extends Publisher<UserCreatedEvent> {
    subject: Subjects.UserCreated = Subjects.UserCreated
}
