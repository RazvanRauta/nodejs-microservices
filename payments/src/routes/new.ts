/**
 * @author: Razvan Rauta
 * Date: Mar 14 2021
 * Time: 13:18
 */

import {
    BadRequestError,
    NotAuthorizedError,
    NotFoundError,
    OrderStatus,
    requireAuth,
    validateRequest,
} from '@rrazvan.dev/ticketing-common'
import express, { Request, Response } from 'express'
import { body } from 'express-validator'
import { Types as MongooseTypes } from 'mongoose'
import { Order } from '../models/order'

const router = express.Router()

router.post(
    '/api/payments',
    requireAuth,
    [
        body('orderId')
            .not()
            .isEmpty()
            .custom((idValue) => MongooseTypes.ObjectId.isValid(idValue))
            .withMessage('The order id must be a valid MongoDB ObjectId'),
        body('token').not().isEmpty().withMessage('The token must be provided'),
    ],
    validateRequest,
    async (req: Request, res: Response) => {
        const { orderId, token } = req.body

        const order = await Order.findById(orderId)

        if (!order) {
            throw new NotFoundError()
        }

        if (order.userId !== req.currentUser!.id) {
            throw new NotAuthorizedError()
        }

        if (order.status === OrderStatus.Cancelled) {
            throw new BadRequestError('Order is cancelled')
        }

        res.status(201)
    }
)

export { router as createChargeRouter }
