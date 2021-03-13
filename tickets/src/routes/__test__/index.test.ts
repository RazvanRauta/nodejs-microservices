/**
 * @author: Razvan Rauta
 * Date: Mar 13 2021
 * Time: 17:59
 */

import request from 'supertest'

import { app } from '../../app'

const createTicket = (title: string, price: number) => {
    return request(app)
        .post('/api/tickets')
        .set('Cookie', global.signin())
        .send({
            title,
            price,
        })
}

it('can fetch a list of tickets', async () => {
    await createTicket('First ticket', 57.24)
    await createTicket('Second ticket', 25.14)
    await createTicket('Third ticket', 57.24)

    const response = await request(app).get('/api/tickets').send().expect(200)

    expect(response.body.length).toEqual(3)
})
