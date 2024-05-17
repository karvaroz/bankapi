import { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import UserService from '../services/UserService'
import { AccountStatus, EmailStatus, UserRole } from '../interfaces/enum/userEnum'
import { IUserCreationBody } from '../interfaces/IUser'
import Utility from '../utils/index.utils'
import { ResponseCode } from '../interfaces/enum/codeEnum'

class UserController {
  private userService: UserService

  constructor(__userService: UserService) {
    this.userService = __userService
  }

  async register(req: Request, res: Response) {
    try {
      const params = { ...req.body }

      const newUser: IUserCreationBody = {
        firstname: params.firstname,
        lastname: params.lastname,
        email: params.email,
        username: params.email.split('@')[0],
        password: params.password,
        role: UserRole.CUSTOMER,
        isEmailVerified: EmailStatus.NOT_VERIFIED,
        accountStatus: AccountStatus.ACTIVE,
        createdAt: new Date(),
        updatedAt: new Date()
      }
      newUser.password = bcrypt.hashSync(newUser.password, 10)
      let userExists = await this.userService.getUserByField({ email: newUser.email })

      if (userExists) {
        return Utility.handleError(res, 'User already exists', ResponseCode.ALREADY_EXIST)
      }

      let user = await this.userService.createUser(newUser)
      user.password = ''

      return Utility.handleSuccess(res, 'User created', { user }, ResponseCode.SUCCESS)
    } catch (error) {
      res.status(500).json({ message: 'Internal server error', error })
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
