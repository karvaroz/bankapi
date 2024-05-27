import { Request, Response } from 'express'
import { ResponseCode } from '../interfaces/enum/codeEnum'
import AccountService from '../services/AccountService'
import Utility from '../utils/index.utils'

class AccountController {
  private accountService: AccountService

  constructor(_accountService: AccountService) {
    this.accountService = _accountService
  }

  async createAccount(req: Request, res: Response) {
    try {
      const params = { ...req.body }
      const newAccount = {
        userId: params.user.id,
        type: params.type
      }

      let account = await this.accountService.createAccount(newAccount)
      return Utility.handleSuccess(res, 'Account created successfully', { account }, ResponseCode.SUCCESS)
    } catch (error) {
      return Utility.handleError(res, (error as TypeError).message, ResponseCode.SERVER_ERROR)
    }
  }
}

export default AccountController
