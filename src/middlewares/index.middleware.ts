import { NextFunction, Request, Response } from 'express'
import { Schema } from 'yup'
import Utility from '../utils/index.utils'
import { ResponseCode } from '../interfaces/enum/codeEnum'
import { IUser } from '../interfaces/IUser'
import jwt from 'jsonwebtoken'
import { AccountStatus } from '../interfaces/enum/userEnum'
import { userService } from '../router/UserRouter'

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(`[${new Date().toISOString()}] ${req.method} ${req.url} - ${err.message}`)

  const statusCode = err instanceof SyntaxError ? 400 : 500

  res.status(statusCode).json({ error: err.message })
}

export const notFoundHandler = (req: Request, res: Response, next: NextFunction) => {
  const error = new Error(`Not Found - ${req.originalUrl}`)
  res.status(404).json({ error: error.message })
}

export const validator = (schema: Schema<any>) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validate(req.body, { abortEarly: false })
      next()
    } catch (error: any) {
      return Utility.handleError(res, error.errors[0], ResponseCode.BAD_REQUEST)
    }
  }
}

export const Auth = () => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      let token: string = req.headers.authorization ?? ''
      if (Utility.IsEmpty(token)) {
        throw new TypeError('Authorization failed')
      }
      token = token.split(' ')[1]
      const decode = jwt.verify(token, process.env.JWT_KEY as string) as IUser
      if (decode && decode.id) {
        const user = await userService.getUserByField({ id: decode.id })
        if (!user) {
          throw new TypeError('Authorization failed')
        }

        if (user.accountStatus == AccountStatus.DELETED) {
          throw new TypeError('Account does not exist')
        }

        if (user.accountStatus == AccountStatus.SUSPENDED) {
          throw new TypeError('Account suspended')
        }

        if (user.accountStatus == AccountStatus.FROZEN) {
          throw new TypeError('Account frozen')
        }
      }
      req.body.user = decode
      next()
    } catch (error) {
      return Utility.handleError(res, (error as TypeError).message, ResponseCode.BAD_REQUEST)
    }
  }
}
