import mongoose from 'mongoose';
import config from '../../config';
import { TAcademicSemester } from '../academicSemester/academicSemester.interface';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { TUser } from './user.interface';
import { User } from './user.model';
import { generateStudentId } from './user.utils';
import AppError from '../../errors/AppErrors';
import httpStatus from 'http-status';

const createStudentInToDB = async (password: string, payload: TStudent) => {
  const userData: Partial<TUser> = {};

  userData.password = password || (config.default_pass as string);
  userData.role = 'student'; // student role

  // get semester by _id
  const admissionSemester = await AcademicSemester.findById(
    payload.admissionSemester,
  );

  // session create
  const session = await mongoose.startSession();
  try {
    session.startTransaction(); // transaction start hobe.

    // call generateId create function
    userData.id = await generateStudentId(
      admissionSemester as TAcademicSemester,
    );
    // create user (transaction-1)
    const newUser = await User.create([userData], { session });

    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user!');
    }
    payload.id = newUser[0].id; // embedding id
    payload.user = newUser[0]._id; // reference id

    // create student (transaction-2)
    const newStudent = await Student.create([payload], { session });
    if (!newStudent.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create student!');
    }  

    await session.commitTransaction();
    await session.endSession();

    return newStudent[0];
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error("Failed to create Student!")
  }
};

export const UsersServices = {
  createStudentInToDB,
};
