/**
 * @author: Razvan Rauta
 * Date: Mar 14 2021
 * Time: 13:17
 */

import { requireAuth } from '@rrazvan.dev/ticketing-common'
import express, { Request, Response } from 'express'
import { Order } from '../models/order'

const router = express.Router()

router.get('/api/orders', requireAuth, async (req: Request, res: Response) => {
    const orders = await Order.find({
        userId: req.currentUser!.id,
    }).populate('ticket')

    res.send(orders)
})

export { router as indexOrderRouter }
