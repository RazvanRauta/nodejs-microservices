/**
 * @author: Razvan Rauta
 * Date: Mar 20 2021
 * Time: 12:14
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
import { PaymentCreatedPublisher } from '../events/publishers/payment-created-publisher'
import { Order } from '../models/order'
import { Payment } from '../models/payment'
import { natsWrapper } from '../nats-wrapper'
import { stripe } from '../stripe'

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
        body('userEmail')
            .not()
            .isEmpty()
            .withMessage('The user email must be provided'),
    ],
    validateRequest,
    async (req: Request, res: Response) => {
        const { orderId, token, userEmail } = req.body

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

        const charge = await stripe.charges.create({
            amount: order.price * 100,
            currency: 'usd',
            source: token,
            description: `Payment for ticketing.dev`,
        })

        const payment = Payment.build({
            orderId,
            stripeId: charge.id,
        })

        await payment.save()

        new PaymentCreatedPublisher(natsWrapper.client).publish({
            id: payment.id,
            orderId: payment.orderId,
            stripeId: payment.stripeId,
            userEmail: userEmail,
        })

        res.status(201).send({ id: payment.id })
    }
)

export { router as createChargeRouter }
