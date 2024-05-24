import { addMinutes } from 'date-fns'
import { IFindTokenQuery, IToken, ITokenCreationBody, ITokenDataSource } from '../interfaces/IToken'
import Utility from '../utils/index.utils'

class TokenService {
  private tokenDataSource: ITokenDataSource
  private readonly tokenExpires: number = 5
  public TokenTypes = { FORGOT_PASSWORD: 'FORGOT_PASSWORD' }
  public TokenStatus = { NOT_USED: 'NOT_USED', USED: 'USED' }

  constructor(_tokenDataSource: ITokenDataSource) {
    this.tokenDataSource = _tokenDataSource
  }

  async getTokenByField(record: Partial<IToken>): Promise<IToken | null> {
    const query = { where: { ...record }, raw: true } as IFindTokenQuery
    return this.tokenDataSource.fetchOne(query)
  }

  async createForgotPasswordToken(email: string): Promise<IToken | null> {
    const tokenData = {
      key: email,
      type: this.TokenTypes.FORGOT_PASSWORD,
      expires: addMinutes(new Date(), this.tokenExpires),
      status: this.TokenStatus.NOT_USED
    } as ITokenCreationBody
    let token = await this.createToken(tokenData)
    return token
  }
  async createToken(record: ITokenCreationBody) {
    const tokenData = { ...record }
    let validCode = false
    while (!validCode) {
      tokenData.code = Utility.generateCode(6)
      const isCodeExist = await this.getTokenByField({ code: tokenData.code })
      if (isCodeExist) {
        validCode = true
        break
      }
    }
    return this.tokenDataSource.create(record)
  }
}

export default TokenService
