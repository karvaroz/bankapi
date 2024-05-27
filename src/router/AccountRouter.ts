import express, { Router, Request, Response } from 'express'

import { Auth, validator } from '../middlewares/index.middleware'
import ValidationSchema from '../validators/accountSchemaValidator'
import AccountService from '../services/AccountService'
import AccountDataSource from '../database/datasources/accountDataSource'
import AccountController from '../controllers/AccountController'

const router = express.Router()
const accountService = new AccountService(new AccountDataSource())
const accountController = new AccountController(accountService)

const AccountRouter = (): Router => {
  router.post('/create-account', validator(ValidationSchema.CreateAccountSchema), Auth(), (req: Request, res: Response) => {
    return accountController.createAccount(req, res)
  })

  return router
}

export default AccountRouter
