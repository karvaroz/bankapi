import { Response } from 'express'

const handleError = (res: Response, message: string, statusCode: number = 400) => {
  return res.status(statusCode).json({ status: false, message })
}

const handleSuccess = (res: Response, message: string, data = {}, statusCode: number = 200) => {
  return res.status(statusCode).json({ status: true, message, data: { ...data } })
}

const Utility = {
  handleError,
  handleSuccess
}

export default Utility
