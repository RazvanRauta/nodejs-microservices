/**
 * @author: Razvan Rauta
 * Date: Mar 13 2021
 * Time: 18:11
 */

import express, { Request, Response } from 'express'
import { Ticket } from '../models/ticket'

const router = express.Router()

router.get('/api/tickets', async (req: Request, res: Response) => {
    const tickets = await Ticket.find({})

    res.send(tickets)
})

export { router as indexTicketRouter }
