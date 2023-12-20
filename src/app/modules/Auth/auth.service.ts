import httpStatus from 'http-status';
import AppError from '../../errors/AppErrors';
import { User } from '../user/user.model';
import { TChangePassword, TLoginUser } from './auth.interface';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../../config';
import bcrypt from 'bcrypt';
import { createToken } from './auth.utils';

const loginUser = async (payload: TLoginUser) => {
  const user = await User.isUserExistsByCustomId(payload.id);
  // console.log(user);
  // check if user is exist
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found!');
  }
  // checking if the use is already deleted
  const isDeleted = user.isDeleted;
  if (isDeleted) {
    if (isDeleted) {
      throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted!');
    }
  }
  // // checking if the use is blocked
  const userStatus = user.status;
  if (userStatus === 'blocked') {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked!');
  }
  // // check if the password is correct
  if (!(await User.isPasswordMatched(payload?.password, user?.password))) {
    throw new AppError(httpStatus.FORBIDDEN, 'Password do not match!');
  }
  // create token and sent to the client
  const jwtPayload = {
    userId: user.id,
    role: user.role,
  };
  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expireIn as string,
  );
  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expireIn as string,
  );
  return {
    accessToken,
    refreshToken,
    needsPasswordChange: user?.needsPasswordChange,
  };
};

const changePassword = async (
  decodedUserData: JwtPayload,
  payload: TChangePassword,
) => {
  //get user by decoded user userId
  const user = await User.isUserExistsByCustomId(decodedUserData.userId);
  // check if user is exist
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found!');
  }
  // checking if the use is already deleted
  const isDeleted = user.isDeleted;
  if (isDeleted) {
    if (isDeleted) {
      throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted!');
    }
  }
  // checking if the use is blocked
  const userStatus = user.status;
  if (userStatus === 'blocked') {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked!');
  }
  // check if the password is correct
  if (!(await User.isPasswordMatched(payload?.oldPassword, user?.password))) {
    throw new AppError(httpStatus.FORBIDDEN, 'Old password is do not match!');
  }
  // new password hashing
  const newPasswordHash = await bcrypt.hash(
    payload.newPassword,
    Number(config.bcrypt_salt_rounds),
  );
  await User.findOneAndUpdate(
    { id: decodedUserData.userId, role: decodedUserData.role },
    {
      password: newPasswordHash,
      needsPasswordChange: false,
      passwordChangedAt: new Date(),
    },
  );
  return null;
};

const refreshToken = async (token: string) => {
  // check if the token is valid
  const decoded = jwt.verify(
    token,
    config.jwt_refresh_secret as string,
  ) as JwtPayload;

  const { userId, iat } = decoded;
  const user = await User.isUserExistsByCustomId(userId);
  // check if user is exist
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found!');
  }
  // checking if the use is already deleted
  const isDeleted = user.isDeleted;
  if (isDeleted) {
    if (isDeleted) {
      throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted!');
    }
  }
  // checking if the use is blocked
  const userStatus = user.status;
  if (userStatus === 'blocked') {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked!');
  }
  // If the password is changed .Login with new password and give JWT token
  if (
    user.passwordChangedAt &&
    User.isJWTIssuedBeforePasswordChanged(user.passwordChangedAt, iat as number)
  ) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized!');
  }
  const jwtPayload = {
    userId: user.id,
    role: user.role,
  };
  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expireIn as string,
  );
  return {
    accessToken,
  };
};
export const AuthServices = {
  loginUser,
  changePassword,
  refreshToken,
};
