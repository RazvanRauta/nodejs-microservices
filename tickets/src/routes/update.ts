/**
 * @author: Razvan Rauta
 * Date: Mar 13 2021
 * Time: 18:33
 */

import {
    NotAuthorizedError,
    NotFoundError,
    requireAuth,
    validateRequest,
} from '@rrazvan.dev/ticketing-common'
import express, { Request, Response } from 'express'
import { body, param } from 'express-validator'
import { Types as MongooseTypes } from 'mongoose'

import { TicketUpdatedPublisher } from '../events/publishers/ticket-updated-publisher'
import { Ticket } from '../models/ticket'
import { natsWrapper } from '../nats-wrapper'

const router = express.Router()

router.put(
    '/api/tickets/:id',
    requireAuth,
    [
        param('id')
            .custom((idValue) => MongooseTypes.ObjectId.isValid(idValue))
            .withMessage('The ticket id must be a valid MongoDB ObjectId'),
        body('title').not().isEmpty().withMessage('Title is required'),
        body('price')
            .isFloat({ gt: 0 })
            .withMessage('Price must be greater than 0'),
    ],
    validateRequest,
    async (req: Request, res: Response) => {
        const ticket = await Ticket.findById(req.params.id)

        if (!ticket) {
            throw new NotFoundError()
        }

        if (ticket.userId !== req.currentUser!.id) {
            throw new NotAuthorizedError()
        }

        const { title, price } = req.body

        ticket.set({ title, price })

        await ticket.save()

        await new TicketUpdatedPublisher(natsWrapper.client).publish({
            id: ticket.id,
            title: ticket.title,
            price: ticket.price,
            userId: ticket.userId,
            version: ticket.version,
        })

        res.status(201).send(ticket)
    }
)

export { router as updateTicketRouter }
