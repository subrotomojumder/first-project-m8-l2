import config from '../../config';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { TUser } from './user.interface';
import { User } from './user.module';

const createStudentInToDB = async (password: string, studentData: TStudent) => {
  const userData: Partial<TUser> = {};

  userData.password = password || (config.default_pass as string);
  userData.role = 'student';
  userData.id = '200454567d467';

  const newUser = await User.create(userData);

  if (Object.values(newUser).length) {
    studentData.id = newUser.id; // embedding id
    studentData.user = newUser._id; // reference id
  }
  const newStudent = await Student.create(studentData);
  return newStudent;
};

export const UsersServices = {
  createStudentInToDB,
};
