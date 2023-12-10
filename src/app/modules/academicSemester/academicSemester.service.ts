import httpStatus from 'http-status';
import AppError from '../../errors/AppErrors';
import { academicSemesterNameCodeMapper } from './academicSemester.constant';
import { TAcademicSemester } from './academicSemester.interface';
import { AcademicSemester } from './academicSemester.model';

const createAcademicSemesterInDB = async (payload: TAcademicSemester) => {
  // semester name --> semester code
  // academicSemesterNameCodeMapper['Fall']
  if (academicSemesterNameCodeMapper[payload.name] !== payload.code) {
    throw new AppError(httpStatus.FAILED_DEPENDENCY,'Invalid Semester Code');
  }
  const result = await AcademicSemester.create(payload);
  return result;
};

const getAllAcademicSemestersFromDB = async () => {
  const result = await AcademicSemester.find();
  return result;
};

const getSingleAcademicSemesterFromDB = async (id: string) => {
  const result = await AcademicSemester.findById(id);
  return result;
};

const updateAcademicSemesterInDB = async (
  id: string,
  payload: Partial<TAcademicSemester>,
) => {
  if (
    payload.name &&
    payload.code &&
    academicSemesterNameCodeMapper[payload.name] !== payload.code
  ) {
    throw new AppError(httpStatus.FAILED_DEPENDENCY ,'Invalid Semester Code');
  }

  const result = await AcademicSemester.findByIdAndUpdate( id , payload, {
    new: true,
  });
  return result;
};

export const AcademicSemesterServices = {
  createAcademicSemesterInDB,
  getAllAcademicSemestersFromDB,
  getSingleAcademicSemesterFromDB,
  updateAcademicSemesterInDB,
};