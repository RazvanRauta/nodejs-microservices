/**
 * @author: Razvan Rauta
 * Date: Mar 14 2021
 * Time: 13:18
 */

import {
    BadRequestError,
    NotFoundError,
    OrderStatus,
    requireAuth,
    validateRequest,
} from '@rrazvan.dev/ticketing-common'
import express, { Request, Response } from 'express'
import { body } from 'express-validator'
import { Types as MongooseTypes } from 'mongoose'
import { OrderCreatedPublisher } from '../events/publishers/order-cancelled-publisher'
import { Order } from '../models/order'
import { Ticket } from '../models/ticket'
import { natsWrapper } from '../nats-wrapper'

const router = express.Router()

const EXPIRATION_WINDOW_SECONDS = 1 * 60

router.post(
    '/api/orders',
    requireAuth,
    [
        body('ticketId')
            .not()
            .isEmpty()
            .custom((idValue) => MongooseTypes.ObjectId.isValid(idValue))
            .withMessage('The ticket id must be a valid MongoDB ObjectId'),
    ],
    validateRequest,
    async (req: Request, res: Response) => {
        const { ticketId } = req.body

        const ticket = await Ticket.findById(ticketId)

        if (!ticket) {
            throw new NotFoundError()
        }

        const isReserved = await ticket.isReserved()

        if (isReserved) {
            throw new BadRequestError('Ticket is already reserved')
        }

        const expiration = new Date()
        expiration.setSeconds(
            expiration.getSeconds() + EXPIRATION_WINDOW_SECONDS
        )

        const order = Order.build({
            expiresAt: expiration,
            status: OrderStatus.Created,
            userId: req.currentUser!.id,
            ticket,
        })

        await order.save()

        await new OrderCreatedPublisher(natsWrapper.client).publish({
            id: order.id,
            //@ts-expect-error
            status: order.status,
            version: order.version,
            userId: order.userId,
            expiresAt: order.expiresAt.toISOString(),
            ticket: {
                id: ticket.id,
                price: ticket.price,
            },
        })

        res.status(201).send(order)
    }
)

export { router as createOrderRouter }
