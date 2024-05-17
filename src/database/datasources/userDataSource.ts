import { IFindUserQuery, IUser, IUserCreationBody, IUserDataSource } from '../../interfaces/IUser'
import UserModel from '../../models/UserModel'

class UserDataSource implements IUserDataSource {
  async create(user: IUserCreationBody): Promise<IUser> {
    return await UserModel.create(user)
  }
  async fetchOne(query: IFindUserQuery): Promise<IUser | null> {
    return await UserModel.findOne(query)
  }
}

export default UserDataSource
