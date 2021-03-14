/**
 * @author: Razvan Rauta
 * Date: Mar 14 2021
 * Time: 14:22
 */

import mongoose from 'mongoose'
import request from 'supertest'
import { app } from '../../app'

it('returns an error if the ticket does not exist', async () => {
    const ticketId = mongoose.Types.ObjectId()

    await request(app)
        .post('/api/orders')
        .set('Cookie', global.signin())
        .send({ ticketId })
        .expect(404)
})

it('returns an error if the ticket is already reserved', async () => {})

it('reserves a ticket', async () => {})
