import { User } from '../user/user.model';
import { TLoginUser } from './auth.interface';

const loginUser = async (payload: TLoginUser) => {
    console.log(payload);
  // const result = await User.
  return "result";
};

export const AuthServices = {
  loginUser,
};
