import { TOfferedCourse } from './offeredCourse.interface';
import { OfferedCourse } from './offeredCourse.model';
import QueryBuilder from '../../builder/QueryBuilder';
import { SemesterRegistration } from '../semesterRegistration/semesterRegistration.model';
import AppError from '../../errors/AppErrors';
import httpStatus from 'http-status';
import { AcademicFaculty } from '../academicFaculty/academicFaculty.model';
import { AcademicDepartment } from '../academicDepartment/academicDepartment.model';
import { Faculty } from '../Faculty/faculty.model';
import { Course } from '../course/course.model';
import hasTimeConflict from './offeredCourse.utils';

const createOfferedCourseInDB = async (payload: TOfferedCourse) => {
  const {
    semesterRegistration,
    academicFaculty,
    academicDepartment,
    course,
    faculty,
    section,
    days,
    startTime,
    endTime,
  } = payload;
  // check if the semester registration id is exists
  const isSemesterRegistrationExists =
    await SemesterRegistration.findById(semesterRegistration);
  if (!isSemesterRegistrationExists) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'Semester registration not found!',
    );
  }
  const academicSemester = isSemesterRegistrationExists.academicSemester;
  // check if the academic faculty id is exists
  const isAcademicFacultyExists =
    await AcademicFaculty.findById(academicFaculty);
  if (!isAcademicFacultyExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Academic faculty not found!');
  }
  // check if the academic department id is exists
  const isAcademicDepartmentExists =
    await AcademicDepartment.findById(academicDepartment);
  if (!isAcademicDepartmentExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Academic department not found!');
  }
  // check if the course id is exists
  const isCourseExists = await Course.findById(course);
  if (!isCourseExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Course not found!');
  }
  // check if the course id is exists
  const isFacultyExists = await Faculty.findById(faculty);
  if (!isFacultyExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Faculty not found!');
  }
  // check if the department is belong to the faculty
  const isDepartmentBelongToFaculty = await AcademicDepartment.findOne({
    _id: academicDepartment,
    academicFaculty,
  });
  if (!isDepartmentBelongToFaculty) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `This ${isAcademicDepartmentExists.name} is not belong to this ${isAcademicFacultyExists?.name}!`,
    );
  }
  // check if the same offered course same section in same registered semester exists
  const isSameOfferedCourseExistsWithSameRegisteredSemesterWithSameSection =
    await OfferedCourse.findOne({
      semesterRegistration,
      course,
      section,
    });
  if (isSameOfferedCourseExistsWithSameRegisteredSemesterWithSameSection) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `Offered course with same section is already exists!`,
    );
  }
  const assignedSchedules = await OfferedCourse.find({
    semesterRegistration,
    faculty,
    days: { $in: days },
  }).select('days startTime endTime');
  const newSchedule = { days, startTime, endTime };
  // check exists new time scheme in assigned schedules
  if (hasTimeConflict(assignedSchedules, newSchedule)) {
    throw new AppError(
      httpStatus.CONFLICT,
      `This faculty is not available at the time ! Chose other time or days`,
    );
  }
  const result = await OfferedCourse.create({ ...payload, academicSemester });
  return result;
};

const getAllOfferedCourseFromDB = async (query: Record<string, unknown>) => {
  const OfferedCourseQuery = new QueryBuilder(OfferedCourse.find(), query)
  const result = await OfferedCourseQuery.modelQuery;
  return result;
};

const getSingleOfferedCourseFromDB = async (id: string) => {
  const result = await OfferedCourse.findById(id);
  return result;
};

const updateOfferedCourseInDB = async (
  id: string,
  payload: Pick<
    TOfferedCourse,
    'faculty' | 'days' | 'startTime' | 'endTime' | 'maxCapacity'
  >,
) => {
  const { faculty, days, startTime, endTime } = payload;
  const isOfferedCourseExists = await OfferedCourse.findById(id);
  if (!isOfferedCourseExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Offered course not found!');
  }
  const isFacultyExists = await Faculty.findById(faculty);
  if (!isFacultyExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Faculty not found!');
  }
  const semesterRegistration = isOfferedCourseExists.semesterRegistration;
  const semesterRegistrationStatus = await SemesterRegistration.findById(semesterRegistration);
  if (semesterRegistrationStatus?.status !== 'UPCOMING') {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `You cannot update this offered course as it is ${semesterRegistrationStatus?.status}`,
    );
  }
  const assignedSchedules = await OfferedCourse.find({
    semesterRegistration,
    faculty,
    days: { $in: days },
  }).select('days startTime endTime');
  const newSchedule = { days, startTime, endTime };
  // check exists new time scheme in assigned schedules
  if (hasTimeConflict(assignedSchedules, newSchedule)) {
    throw new AppError(
      httpStatus.CONFLICT,
      `This faculty is not available at the time ! Chose other time or days`,
    );
  }
  const result = await OfferedCourse.findByIdAndUpdate(id, payload, {
    new: true,
    validation: true,
  });
  return result;
};
const deleteOfferedCourseFromDB = async (id: string) => {
  const isOfferedCourseExists = await OfferedCourse.findById(id);
  if (!isOfferedCourseExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Offered course not found!');
  }
  const semesterRegistration = isOfferedCourseExists.semesterRegistration;
  const semesterRegistrationStatus = await SemesterRegistration.findById(semesterRegistration);
  if (semesterRegistrationStatus?.status !== 'UPCOMING') {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `You cannot update this offered course as it is ${semesterRegistrationStatus?.status}`,
    );
  }
  const result = await OfferedCourse.findByIdAndDelete(id);
  return result;
};

export const OfferedCourseServices = {
  createOfferedCourseInDB,
  getAllOfferedCourseFromDB,
  getSingleOfferedCourseFromDB,
  updateOfferedCourseInDB,
  deleteOfferedCourseFromDB
};
