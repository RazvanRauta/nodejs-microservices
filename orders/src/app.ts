/**
 * @author: Razvan Rauta
 * Date: Mar 14 2021
 * Time: 12:54
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

import { createOrderRouter } from './routes/new'
import { showOrderRouter } from './routes/show'
import { indexOrderRouter } from './routes/index'
import { deleteOrderRouter } from './routes/delete'

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

app.use(createOrderRouter)
app.use(showOrderRouter)
app.use(indexOrderRouter)
app.use(deleteOrderRouter)

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
