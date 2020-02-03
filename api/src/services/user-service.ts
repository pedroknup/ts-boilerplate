import { user } from "../entities/user";
import { getRepository } from "typeorm";
import { user_external_login } from "../entities/user_external_login";
import { LoginProviderService } from "./login-provider-service";

class UserService {
  static getUserById = async (id: number): Promise<user> => {
    const userRepository = getRepository(user);
    return userRepository.findOneOrFail({ where: { id }, relations: ["role"] });
  };
  static getUserByEmail = async (email: string): Promise<user> => {
    const userRepository = getRepository(user);
    console.log("looking for email", email);
    return userRepository.findOneOrFail({
      where: { email },
      relations: ["role"]
    });
  };
  static getUserByFBId = async (fbId: string): Promise<user> => {
    const userExternalLoginRepository = getRepository(user_external_login);
    const facebookProvider = LoginProviderService.getLoginProviderByName(
      "facebook"
    );
    const userExternalLogin = await userExternalLoginRepository.findOneOrFail({
      where: { loginProvider: facebookProvider, userAccountId: fbId },
      relations: ["user"]
    });
    return userExternalLogin.user;
  };
  static getUserByLinkedinId = async (linkedinId: string): Promise<user> => {
    const userExternalLoginRepository = getRepository(user_external_login);
    const facebookProvider = LoginProviderService.getLoginProviderByName(
      "linkedin"
    );
    const userExternalLogin = await userExternalLoginRepository.findOneOrFail({
      where: { loginProvider: facebookProvider, userAccountId: linkedinId },
      relations: ["user"]
    });
    return userExternalLogin.user;
  };
  static getUserByGoogleId = async (googleId: string): Promise<user> => {
    const userExternalLoginRepository = getRepository(user_external_login);
    const facebookProvider = LoginProviderService.getLoginProviderByName(
      "google"
    );
    const userExternalLogin = await userExternalLoginRepository.findOneOrFail({
      where: {
        loginProvider: facebookProvider,
        userAccountId: googleId
      },
      relations: ["user"]
    });
    return userExternalLogin.user;
  };
  static addUser = async (userToAdd: user): Promise<void> => {
    const userRepository = getRepository(user);
    await userRepository.insert(userToAdd);
  };

  static updateUser = async (userToUpdate: user): Promise<void> => {
    const userRepository = getRepository(user);
    await userRepository.update(userToUpdate.id, userToUpdate);
  };
}

export { UserService };
