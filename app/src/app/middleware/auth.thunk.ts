import { AuthApi, LoginBody } from '../../api/api';

export const authThunk = async (loginbody: LoginBody) => {
  const api = new AuthApi();
  api
    .authLoginPost(loginbody)
    .then((response) => {
      console.log(response.body);
    })
    .catch((error: any) => {
      console.log(error);
    });
};
