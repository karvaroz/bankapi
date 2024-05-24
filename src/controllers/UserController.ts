import { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import UserService from '../services/UserService'
import { AccountStatus, EmailStatus, UserRole } from '../interfaces/enum/userEnum'
import { IUserCreationBody } from '../interfaces/IUser'
import Utility from '../utils/index.utils'
import { ResponseCode } from '../interfaces/enum/codeEnum'
import jwt from 'jsonwebtoken'
import TokenService from '../services/TokenService'
import { IToken } from '../interfaces/IToken'

class UserController {
  private userService: UserService
  private tokenService: TokenService

  constructor(__userService: UserService, __tokenService: TokenService) {
    this.userService = __userService
    this.tokenService = __tokenService
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
      return Utility.handleError(res, (error as TypeError).message, ResponseCode.SERVER_ERROR)
    }
  }

  async login(req: Request, res: Response) {
    try {
      const params = { ...req.body }
      let user = await this.userService.getUserByField({ email: params.email })
      if (!user) {
        return Utility.handleError(res, 'Invalid login details', ResponseCode.NOT_FOUND)
      }

      let isPasswordMatch = await bcrypt.compare(params.password, user.password)
      if (!isPasswordMatch) {
        return Utility.handleError(res, 'Invalid login details', ResponseCode.NOT_FOUND)
      }

      const token = jwt.sign(
        {
          id: user.id,
          firstname: user.firstname,
          lastname: user.lastname,
          email: user.email,
          role: user.role
        },
        process.env.JWT_KEY as string,
        { expiresIn: '30d' }
      )
      return Utility.handleSuccess(res, 'Login successful', { user, token }, ResponseCode.SUCCESS)
    } catch (error) {
      return Utility.handleError(res, (error as TypeError).message, ResponseCode.SERVER_ERROR)
    }
  }

  async forgotPassword(req: Request, res: Response) {
    try {
      const params = { ...req.body }
      let user = await this.userService.getUserByField({ email: params.email })
      if (!user) {
        return Utility.handleError(res, 'Account does not exist', ResponseCode.NOT_FOUND)
      }

      const token = (await this.tokenService.createForgotPasswordToken(params.email)) as IToken
      // await EmailService.sendForgotPasswordMail(params.email , token.code)
      return Utility.handleSuccess(res, 'Password reset code has been sent to your mail ', {}, ResponseCode.SUCCESS)
    } catch (error) {
      return Utility.handleError(res, (error as TypeError).message, ResponseCode.SERVER_ERROR)
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
