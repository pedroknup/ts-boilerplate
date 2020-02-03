import { user } from "../entities/user";
import { login_provider } from "../entities/login_provider";
import { getRepository } from "typeorm";
import { user_external_login } from "../entities/user_external_login";

class LoginProviderService {
  static getLoginProviderByName = async (
    name: string
  ): Promise<login_provider> => {
    const userExternalLoginRepository = getRepository(login_provider);
    return userExternalLoginRepository.findOneOrFail({ where: { name } });
  };
}

export { LoginProviderService };
