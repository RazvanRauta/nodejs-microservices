/**
 * @author: Razvan Rauta
 * Date: Oct 11 2020
 * Time: 15:10
 */

import { MongoMemoryServer } from 'mongodb-memory-server'
import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'

declare global {
    namespace NodeJS {
        interface Global {
            signin(userId?: string): string[]
        }
    }
}

//! Mock NatsWrapper
jest.mock('../nats-wrapper')
process.env.STRIPE_KRY =
    'sk_test_51IX7ANAMmGQtQHB5ljmDNwldbjUueeDB4SbwfSNa82M3jYSctm98XbZd6pv9Oe7pkWBkgKdMXm4ZtJ2FBjUIg8fE00algc6qeM'
let mongo: any

beforeAll(async () => {
    process.env.JWT_KEY = 'parola'

    mongo = new MongoMemoryServer()
    const mongoUri = await mongo.getUri()

    await mongoose.connect(mongoUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
})

beforeEach(async () => {
    jest.clearAllMocks()
    const collections = await mongoose.connection.db.collections()

    for (let collection of collections) {
        await collection.deleteMany({})
    }
})

afterAll(async () => {
    await mongo.stop()
    await mongoose.connection.close()
})

global.signin = (userId?: string) => {
    const sessionJSON = JSON.stringify({
        jwt: jwt.sign(
            {
                id: userId ?? '123213213',
                email: 'test@test.com',
            },
            process.env.JWT_KEY!
        ),
    })

    const base64 = Buffer.from(sessionJSON).toString('base64')

    return [`express:sess=${base64}`]
}
