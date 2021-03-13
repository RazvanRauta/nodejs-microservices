/**
 * @author: Razvan Rauta
 * Date: Oct 11 2020
 * Time: 15:10
 */

import { MongoMemoryServer } from 'mongodb-memory-server'
import request from 'supertest'
import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'

import { app } from '../app'

declare global {
    namespace NodeJS {
        interface Global {
            signin(userId?: string): string[]
        }
    }
}

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
