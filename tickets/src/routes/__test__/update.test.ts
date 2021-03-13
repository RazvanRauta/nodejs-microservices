/**
 * @author: Razvan Rauta
 * Date: Mar 13 2021
 * Time: 18:20
 */

import request from 'supertest'
import mongoose from 'mongoose'

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

it('returns a 404 if the provided id does not exist', async () => {
    const id = new mongoose.Types.ObjectId().toHexString()
    await request(app)
        .put(`/api/tickets/${id}`)
        .set('Cookie', global.signin())
        .send({ title: 'Ticket title', price: 254 })
        .expect(404)
})

it('returns a 401 if the user is not authenticated', async () => {
    const id = new mongoose.Types.ObjectId().toHexString()
    await request(app)
        .put(`/api/tickets/${id}`)
        .send({ title: 'Ticket title', price: 254 })
        .expect(401)
})

it('returns a 401 if the user does not own the ticket', async () => {
    const response = await createTicket('This is a title', 123)

    await request(app)
        .put(`/api/tickets/${response.body.id}`)
        .set('Cookie', global.signin('foreigner'))
        .send({ title: 'Ticket title', price: 254 })
        .expect(401)
})

it('returns a 400 if the user provides invalid title or price', async () => {
    const response = await createTicket('This is a title', 123)

    await request(app)
        .put(`/api/tickets/${response.body.id}`)
        .set('Cookie', global.signin())
        .send({ price: 254 })
        .expect(400)

    await request(app)
        .put(`/api/tickets/${response.body.id}`)
        .set('Cookie', global.signin())
        .send({ title: 'Ticket title' })
        .expect(400)
})

it('updates the ticket provide', async () => {
    const res = await createTicket('This is a title', 123)

    const { title: initialTitle, price: initialPrice, id } = res.body

    const response = await request(app)
        .put(`/api/tickets/${id}`)
        .set('Cookie', global.signin())
        .send({ title: 'This is another title', price: 254 })

    const { title: updatedTitle, price: updatePrice } = response.body

    expect(response.status).toEqual(201)

    expect(initialTitle).toEqual('This is a title')
    expect(initialPrice).toEqual(123)

    expect(updatedTitle).toEqual('This is another title')
    expect(updatePrice).toEqual(254)
})
