import { UserModel, User } from "../database/models/user";

export class UserRepository {
  async getById(id: string): Promise<User | null> {
    return await UserModel.findById(id);
  }
}