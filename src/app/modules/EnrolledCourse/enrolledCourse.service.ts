/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import AppError from '../../errors/AppErrors';
import { OfferedCourse } from '../OfferedCourse/offeredCourse.model';
import { TEnrolledCourse } from './enrolledCourse.interface';
import { EnrolledCourse } from './enrolledCourse.model';
import { Student } from '../Student/student.model';
import { SemesterRegistration } from '../semesterRegistration/semesterRegistration.model';
import { Course } from '../course/course.model';
import mongoose from 'mongoose';
import { Faculty } from '../Faculty/faculty.model';
import { calculateGradeAndGradePoints } from './enrolledCourse.utils';

const createEnrolledCourseIntoDB = async (
  userId: string,
  payload: TEnrolledCourse,
) => {
  /**
   * step1: check if the offered course is exists
   * step2: check id the student is already exists
   * step3: check if the total credits exceeds registration maxCredits
   * step4: create an enrolled course
   */

  const { offeredCourse } = payload;
  const isOfferedCourseExists = await OfferedCourse.findById(offeredCourse);
  if (!isOfferedCourseExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Offered course not found!');
  }
  const student = await Student.findOne({ id: userId }, { _id: 1 });
  if (!student) {
    throw new AppError(httpStatus.NOT_FOUND, 'Student is not found!');
  }
  const isStudentAlreadyEnrolled = await EnrolledCourse.findOne({
    semesterRegistration: isOfferedCourseExists?.semesterRegistration,
    offeredCourse,
    student: student?._id,
  });
  if (isStudentAlreadyEnrolled) {
    throw new AppError(httpStatus.NOT_FOUND, 'Student is already enrolled!');
  }
  if (isStudentAlreadyEnrolled) {
    throw new AppError(httpStatus.NOT_FOUND, 'Student is already enrolled!');
  }

  if (isOfferedCourseExists?.maxCapacity <= 0) {
    throw new AppError(httpStatus.NOT_FOUND, 'Room is full!');
  }

  // calculate enrolled courses total maxCredits
  const enrolledCourses = await EnrolledCourse.aggregate([
    {
      $match: {
        student: student._id,
        semesterRegistration: isOfferedCourseExists.semesterRegistration,
      },
    },
    {
      $lookup: {
        from: 'courses',
        localField: 'course',
        foreignField: '_id',
        as: 'enrolledCourseData',
      },
    },
    {
      $unwind: '$enrolledCourseData',
    },
    {
      $group: {
        _id: null,
        totalEnrolledCredits: { $sum: '$enrolledCourseData.credits' },
      },
    },
    { $project: { totalEnrolledCredits: 1, _id: 0 } },
  ]);

  const totalEnrolledCredits =
    enrolledCourses.length > 0 ? enrolledCourses[0]?.totalEnrolledCredits : 0;

  // check total credits exceeds maxCredits
  const semesterRegistration = await SemesterRegistration.findById(
    isOfferedCourseExists.semesterRegistration,
  ).select('maxCredit');
  const maxCredit = semesterRegistration?.maxCredit;
  const course = await Course.findById(isOfferedCourseExists.course).select(
    'credits',
  );
  const currentCredits = course?.credits;
  // total enrolled credits + new enrolled course credits > maxCredits
  if (
    totalEnrolledCredits &&
    maxCredit &&
    totalEnrolledCredits + currentCredits > maxCredit
  ) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'You have exceeded maximum number of credits !',
    );
  }
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const result = await EnrolledCourse.create(
      [
        {
          semesterRegistration: isOfferedCourseExists.semesterRegistration,
          academicSemester: isOfferedCourseExists.academicSemester,
          academicFaculty: isOfferedCourseExists.academicFaculty,
          academicDepartment: isOfferedCourseExists.academicDepartment,
          offeredCourse: offeredCourse,
          course: isOfferedCourseExists.course,
          student: student._id,
          faculty: isOfferedCourseExists.faculty,
          isEnrolled: true,
        },
      ],
      { session },
    );
    if (!result[0]) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        'Failed to enroll in this course!',
      );
    }
    // const maxCapacity = isOfferedCourseExists.maxCapacity;
    await OfferedCourse.findByIdAndUpdate(
      offeredCourse,
      { $inc: { maxCapacity: -1 } },
      {
        new: true,
        runValidators: true,
        session,
      },
    );
    await session.commitTransaction();
    await session.endSession();

    return result;
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(error);
  }
};

const updateEnrolledCourseMarksIntoDB = async (
  facultyId: string,
  payload: Partial<TEnrolledCourse>,
) => {
  const { semesterRegistration, offeredCourse, student, courseMarks } = payload;
  const isSemesterRegistrationExists =
    await SemesterRegistration.findById(semesterRegistration);
  if (!isSemesterRegistrationExists) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'Semester registration is not found!',
    );
  }
  const isOfferedCourseExists = await OfferedCourse.findById(offeredCourse);
  if (!isOfferedCourseExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Offered course is not found!');
  }
  const isStudentExists = await Student.findById(student);
  if (!isStudentExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Student is not found!');
  }
  const faculty = await Faculty.findOne({ id: facultyId }, { _id: 1 });
  if (!faculty) {
    throw new AppError(httpStatus.NOT_FOUND, 'Faculty is not found!');
  }
  const isCourseBelongToFaculty = await EnrolledCourse.findOne({
    semesterRegistration,
    offeredCourse,
    faculty: faculty._id,
  });
  if (!isCourseBelongToFaculty) {
    throw new AppError(httpStatus.FORBIDDEN, 'You are forbidden!');
  }
  const modifiedData: Record<string, unknown> = {
    // ...courseMarks,
  };
  if (courseMarks && Object.keys(courseMarks).length) {
    for (const [key, value] of Object.entries(courseMarks)) {
      modifiedData[`courseMarks.${key}`] = value;
    }
  }
  if (courseMarks?.finalTerm) {
    const { classTest1, midTerm, classTest2, finalTerm } = courseMarks;
    const totalMarks =
      Math.ceil(classTest1 * 0.1) +
      Math.ceil(midTerm * 0.3) +
      Math.ceil(classTest2 * 0.1) +
      Math.ceil(finalTerm * 0.5);
    const result = calculateGradeAndGradePoints(totalMarks);
    modifiedData.grade = result.grade;
    modifiedData.gradePoints = result.gradePoints;
    modifiedData.isCompleted = true;
  }
  const result = await EnrolledCourse.findByIdAndUpdate(
    isCourseBelongToFaculty._id,
    modifiedData,
    { new: true },
  );
  return result;
};
const getAllEnrolledCoursesIntoDB = async () => {
  const result = await EnrolledCourse.find();
  return result;
};

export const EnrolledCourseServices = {
  createEnrolledCourseIntoDB,
  updateEnrolledCourseMarksIntoDB,
  getAllEnrolledCoursesIntoDB,
};
