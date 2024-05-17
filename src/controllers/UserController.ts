import { Request, Response } from 'express'
import UserService from '../services/UserService'
import Utility from '../utils/index.utils'
import { ResponseCode } from '../interfaces/enum/codeEnum'

class UserController {
  private userService: UserService

  constructor(__userService: UserService) {
    this.userService = __userService
  }

  async register(req: Request, res: Response) {
    try {
      res.send({ res, req })
    } catch (error) {
      res.send(error)
    }
  }

  async login(req: Request, res: Response) {
    try {
      res.send('login successfully')
    } catch (error) {
      res.send(error)
    }
  }

  async forgotPassword(req: Request, res: Response) {
    try {
      res.send('forgotPassword successfully')
    } catch (error) {
      res.send(error)
    }
  }

  async resetPassword(req: Request, res: Response) {
    try {
      res.send('resetPassword successfully')
    } catch (error) {
      res.send(error)
    }
  }
}

export default UserController
