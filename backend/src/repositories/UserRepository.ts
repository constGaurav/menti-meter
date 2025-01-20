import prismaClient from "../config/prisma";
import { TUserSignUp } from "../types/user";

export class UserRepository {
  async findUserByEmail(email: string) {
    const user = await prismaClient.user.findUnique({
      where: {
        email,
      },
    });

    return user;
  }

  async createUser(data: TUserSignUp) {
    const user = await prismaClient.user.create({
      data,
    });
    return user;
  }
}
