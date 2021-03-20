/**
 * @author: Razvan Rauta
 * Date: Mar 13 2021
 * Time: 13:57
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

import { createChargeRouter } from './routes/new'

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
app.use(createChargeRouter)

/**
 *
 * * Detect nonexistent routes
 *
 */
app.all('*', async (req, res, next) => {
    console.log({ req })
    throw new NotFoundError()
})

/**
 *
 * * Setting up error handler middleware
 *
 */
app.use(errorHandler)

export { app }
