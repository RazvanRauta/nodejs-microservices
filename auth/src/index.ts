/**
 * @author: Razvan Rauta
 * Date: Oct 03 2020
 * Time: 14:59
 */

import mongoose from 'mongoose'
import { app } from './app'

/**
 *
 * Start to listen after connection to MongoDB is successfully
 *
 */
const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error('JWT_KEY is not defined')
  }

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
