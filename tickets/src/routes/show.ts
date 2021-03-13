/**
 * @author: Razvan Rauta
 * Date: Mar 13 2021
 * Time: 16:47
 */

import { NotFoundError, validateRequest } from '@rrazvan.dev/ticketing-common'
import express, { Request, Response } from 'express'
import { param } from 'express-validator'
import { Types as MongooseTypes } from 'mongoose'

import { Ticket } from '../models/ticket'

const router = express.Router()

router.get(
    '/api/tickets/:id',
    param('id')
        .custom((idValue) => MongooseTypes.ObjectId.isValid(idValue))
        .withMessage('The ticket id must be a valid MongoDB ObjectId'),
    validateRequest,
    async (req: Request, res: Response) => {
        const ticket = await Ticket.findById(req.params.id)

        if (!ticket) {
            throw new NotFoundError()
        }

        res.send(ticket)
    }
)

export { router as showTicketRouter }
