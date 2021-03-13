/**
 * @author: Razvan Rauta
 * Date: Oct 11 2020
 * Time: 14:58
 */

import express from 'express'
import 'express-async-errors'
import { json } from 'body-parser'
import cookieSession from 'cookie-session'
import {
    errorHandler,
    NotFoundError,
    currentUser,
} from '@rrazvan.dev/ticketing-common'

import { createTicketRouter } from './routes/new'
import { showTicketRouter } from './routes/show'

const app = express()
app.set('trust proxy', true)
app.use(json())

app.use(
    cookieSession({
        signed: false,
        secure: process.env.NODE_ENV !== 'test',
    })
)

app.use(currentUser)

/**
 * * Routes
 */

app.use(showTicketRouter)
app.use(createTicketRouter)

/**
 *
 * * Detect nonexistent routes
 *
 */
app.all('*', async (req, res, next) => {
    throw new NotFoundError()
})

/**
 *
 * * Setting up error handler middleware
 *
 */
app.use(errorHandler)

export { app }