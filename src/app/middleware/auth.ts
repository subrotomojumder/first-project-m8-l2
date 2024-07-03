import { NextFunction, Request, Response } from 'express';
import catchAsync from '../utils/catchAsync';
import AppError from '../errors/AppErrors';
import httpStatus from 'http-status';
import { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import { TUserRole } from '../modules/user/user.interface';
import { User } from '../modules/user/user.model';
import { verifyToken } from '../modules/Auth/auth.utils';

const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized!');
    }
    // check if the token is valid
    const decoded = verifyToken(token, config.jwt_access_secret as string);
    const { role, userId, iat } = decoded;
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
      User.isJWTIssuedBeforePasswordChanged(
        user.passwordChangedAt,
        iat as number,
      )
    ) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized!');
    }
    if (requiredRoles && !requiredRoles.includes(role)) {
      // ekhane requested user er role jodi requiredRoles e na thake tahole error throw hobe.
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized!');
    }
    req.user = decoded as JwtPayload;
    next();
  });
};

export default auth;
