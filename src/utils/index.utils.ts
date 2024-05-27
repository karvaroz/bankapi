import { Response } from 'express'
import { createLogger, format, transports } from 'winston'

const Logger = createLogger({
  transports: [
    new transports.File({
      filename: './logs/index.log',
      level: 'error',
      format: format.combine(
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        format.printf((info) => `${info.timestamp} ${info.level} : ${info.message} `)
      )
    })
  ]
})

const EscapeHtml = (html: string) => {
  return html.replace(/[&<>"']/g, '')
}

const IsEmpty = (data: any) => {
  return !data || data.length === 0 || typeof data === 'undefined' || data == null || Object.keys(data).length === 0
}

const handleError = (res: Response, message: string, statusCode: number = 400) => {
  Logger.log({ level: 'error', message })
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
  generateCode,
  IsEmpty,
  EscapeHtml
}

export default Utility
