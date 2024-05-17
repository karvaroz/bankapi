import { NextFunction, Request, Response } from 'express'
import { Schema } from 'yup'
import Utility from '../utils/index.utils'
import { ResponseCode } from '../interfaces/enum/codeEnum'

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
