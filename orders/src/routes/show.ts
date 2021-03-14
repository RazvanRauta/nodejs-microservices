/**
 * @author: Razvan Rauta
 * Date: Mar 14 2021
 * Time: 13:18
 */

import {
    NotAuthorizedError,
    NotFoundError,
    requireAuth,
    validateRequest,
} from '@rrazvan.dev/ticketing-common'
import express, { Request, Response } from 'express'
import { param } from 'express-validator'
import { Types as MongooseTypes } from 'mongoose'

import { Order } from '../models/order'

const router = express.Router()

router.get(
    '/api/orders/:orderId',
    requireAuth,
    param('orderId')
        .custom((idValue) => MongooseTypes.ObjectId.isValid(idValue))
        .withMessage('The order id must be a valid MongoDB ObjectId'),
    validateRequest,
    async (req: Request, res: Response) => {
        const order = await Order.findById(req.params.orderId).populate(
            'ticket'
        )

        if (!order) {
            throw new NotFoundError()
        }
        if (order.userId !== req.currentUser!.id) {
            throw new NotAuthorizedError()
        }

        res.send(order)
    }
)

export { router as showOrderRouter }
