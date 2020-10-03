import express from 'express'
import 'express-async-errors'
import { json } from 'body-parser'
import mongoose from 'mongoose'

import { currentUserRouter } from './routes/current-user'
import { signInRouter } from './routes/signin'
import { signOutRouter } from './routes/signout'
import { signUpRouter } from './routes/signup'
import { errorHandler } from './middlewares/error-handler'
import { NotFoundError } from './errors/not-found-error'

const app = express()
app.use(json())

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

/**
 *
 * Start to listen after connection to MongoDB is successfully
 *
 */
const start = async () => {
  try {
    await mongoose.connect('mongodb://auth-mongo-srv:27017/auth', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    })
    console.log('Connected to MongoDB')
  } catch (err) {
    console.log(err)
  }

  /**
   *
   * Start listening
   *
   */
  app.listen(3000, () => console.log('Listening on port 3000!'))
}

start()
