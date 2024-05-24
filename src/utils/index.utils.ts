import { Response } from 'express'

const handleError = (res: Response, message: string, statusCode: number = 400) => {
  return res.status(statusCode).json({ status: false, message })
}

const handleSuccess = (res: Response, message: string, data = {}, statusCode: number = 200) => {
  return res.status(statusCode).json({ status: true, message, data: { ...data } })
}

const generateCode = (num: number = 15) => {
  const dateString = Date.now().toString(36)
  const randomness = Math.random().toString(36).substr(2)
  let result = randomness + dateString
  result = result.length > num ? result.substring(0, num) : result
  return result.toLocaleUpperCase()
}

const Utility = {
  handleError,
  handleSuccess,
  generateCode
}

export default Utility
