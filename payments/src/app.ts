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
