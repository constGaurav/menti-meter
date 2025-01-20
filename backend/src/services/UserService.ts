import { UserRepository } from "../repositories/UserRepository";
import { AppError } from "../types/error";
import { TUserSignUp } from "../types/user";

export class UserService {
  private userRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async createUser(data: TUserSignUp) {
    // check if the user already exits with the given email id.
    const existingUser = await this.userRepository.findUserByEmail(data.email);
    if (existingUser?.id) {
      throw new AppError(400, "User already exists", "USER_ALREADY_EXISTS");
    }
    const newUser = await this.userRepository.createUser(data);
    return newUser;
  }
}
