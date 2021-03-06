/**
 * @author: Razvan Rauta
 * Date: Oct 11 2020
 * Time: 14:58
 */

import express from 'express'
import 'express-async-errors'
import { json } from 'body-parser'
import cookieSession from 'cookie-session'

import { currentUserRouter } from './routes/current-user'
import { signInRouter } from './routes/signin'
import { signOutRouter } from './routes/signout'
import { signUpRouter } from './routes/signup'
import { errorHandler, NotFoundError } from '@rrazvan.dev/ticketing-common'

const app = express()
app.set('trust proxy', true)
app.use(json())

app.use(
    cookieSession({
        signed: false,
        secure: process.env.NODE_ENV !== 'test',
    })
)

/**
 *
 * Set up routes
 *
 */
app.use(currentUserRouter)
app.use(signInRouter)
app.use(signOutRouter)
app.use(signUpRouter)

/**
 *
 * Detect nonexistent routes
 *
 */
app.all('*', async (req, res, next) => {
    throw new NotFoundError()
})

/**
 *
 * Setting up error handler middleware
 *
 */
app.use(errorHandler)

export { app }
