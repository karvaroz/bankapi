import { IFindTokenQuery, IToken, ITokenCreationBody, ITokenDataSource } from '../../interfaces/IToken'
import TokenModel from '../../models/TokenModel'

class TokenDataSource implements ITokenDataSource {
  async create(token: ITokenCreationBody): Promise<IToken> {
    return await TokenModel.create(token)
  }
  async fetchOne(query: IFindTokenQuery): Promise<IToken | null> {
    return await TokenModel.findOne(query)
  }

  async updateOne(data: Partial<IToken>, query: IFindTokenQuery): Promise<void> {
    await TokenModel.update(data, query)
  }
}

export default TokenDataSource
