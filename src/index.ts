import express, { Request, Response } from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'
import cors from 'cors'

dotenv.config()

import UserRouter from './router/UserRouter'
import DbInitializer from './database/init'
import { errorHandler, notFoundHandler } from './middlewares/index.middleware'

const app = express()
const PORT = process.env.PORT || 5000

app.use(morgan('dev'))
app.use(cors({ origin: '*' }))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use('/api/user', UserRouter())

app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({ message: 'Server is up and running!' })
})

app.use(errorHandler)
app.use(notFoundHandler)

const StartApp = async function () {
  try {
    await DbInitializer()
    app.listen(PORT, () => {
      console.log('App listening on port:', PORT)
    })
  } catch (error) {
    console.error('Unable to connect to the database:', error)
  }
}

StartApp()
