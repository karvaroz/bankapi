import express, { Router, Request, Response } from 'express'

import UserController from '../controllers/UserController'
import UserService from '../services/UserService'
import { validator } from '../middlewares/index.middleware'
import ValidationSchema from '../validators/userSchemaValidator'
import UserDataSource from '../database/datasources/userDataSource'

const UserRouter = (): Router => {
  const router = express.Router()
  const userService = new UserService(new UserDataSource())
  const userController = new UserController(userService)

  router.post('/register', validator(ValidationSchema.RegisterSchema), (req: Request, res: Response) => {
    return userController.register(req, res)
  })

  router.post('/login', validator(ValidationSchema.LoginSchema), (req: Request, res: Response) => {
    return userController.login(req, res)
  })

  router.post('/forgot-password', (req: Request, res: Response) => {
    return userController.forgotPassword(req, res)
  })

  router.post('/reset-password', (req: Request, res: Response) => {
    return userController.resetPassword(req, res)
  })

  return router
}

export default UserRouter
