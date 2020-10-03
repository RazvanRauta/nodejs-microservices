import express from 'express'

const router = express.Router()

router.post('/api/users/signin', (req, res) => {
  res.send('Hello from sign in')
})

export { router as signInRouter }
