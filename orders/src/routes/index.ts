/**
 * @author: Razvan Rauta
 * Date: Mar 14 2021
 * Time: 13:17
 */

import express, { Request, Response } from 'express'

const router = express.Router()

router.get('/api/orders', async (req: Request, res: Response) => {
    res.send({})
})

export { router as indexOrderRouter }
