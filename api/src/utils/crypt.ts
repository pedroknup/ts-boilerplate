import * as bcrypt from "bcryptjs";
const checkIfUnencryptedPasswordIsValid = (
  unencryptedPassword: string,
  password: string
) => {
  return bcrypt.compareSync(unencryptedPassword, password);
};

const hashPassword = (password: string): string => {
  return bcrypt.hashSync(password, 8);
};

export { checkIfUnencryptedPasswordIsValid, hashPassword };
