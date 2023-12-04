import { TAcademicSemester } from '../academicSemester/academicSemester.interface';
import { User } from './user.model';

const findLastStudentId = async () => {
  const result = await User.findOne(
    {
      role: 'student',
    },
    {
      id: 1,
      _id: 0,
    },
  )
    .sort({ createdAt: -1 })
    .lean();
  return result?.id ? result?.id : undefined;
};

//semester code 4 digit number
export const generateStudentId = async (payload: TAcademicSemester) => {
  //first time 0000
  let currentId = (0).toString();
  const lastStudentId = await findLastStudentId();
  const lastStudentSemesterCode = lastStudentId?.substring(4, 6); //01
  const lastStudentSemesterYear = lastStudentId?.substring(0, 4); //2030
  const currentSemesterCode = payload.code;
  const currentSemesterYear = payload.year;

  if (
    lastStudentId &&
    lastStudentSemesterCode === currentSemesterCode &&
    lastStudentSemesterYear === currentSemesterYear
  ) {
    currentId =lastStudentId.substring(6) // 0001
  }

  let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');
  incrementId = `${currentSemesterYear}${currentSemesterCode}${incrementId}`;
  return incrementId;
};
