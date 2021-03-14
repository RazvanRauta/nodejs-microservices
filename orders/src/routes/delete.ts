/**
 * @author: Razvan Rauta
 * Date: Mar 14 2021
 * Time: 13:18
 */

import {
    NotAuthorizedError,
    NotFoundError,
    OrderStatus,
    requireAuth,
    validateRequest,
} from '@rrazvan.dev/ticketing-common'
import express, { Request, Response } from 'express'
import { param } from 'express-validator'
import { Types as MongooseTypes } from 'mongoose'

import { Order } from '../models/order'

const router = express.Router()

router.delete(
    '/api/orders/:orderId',
    requireAuth,
    param('orderId')
        .custom((idValue) => MongooseTypes.ObjectId.isValid(idValue))
        .withMessage('The ticket id must be a valid MongoDB ObjectId'),
    validateRequest,
    async (req: Request, res: Response) => {
        const { orderId } = req.params

        const order = await Order.findById(orderId)

        if (!order) {
            throw new NotFoundError()
        }
        if (order.userId !== req.currentUser!.id) {
            throw new NotAuthorizedError()
        }
        order.status = OrderStatus.Cancelled
        await order.save()

        // publishing an event saying this was cancelled!

        res.status(204).send(order)
    }
)

export { router as deleteOrderRouter }
