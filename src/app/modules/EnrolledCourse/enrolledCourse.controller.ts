import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { EnrolledCourseServices } from './enrolledCourse.service';

const createEnrolledCourse = catchAsync(async (req, res) => {
  const userId = req.user.userId;
  const result = await EnrolledCourseServices.createEnrolledCourseIntoDB(
    userId,
    req.body,
  );
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Student is enrolled successfully!',
    data: result,
  });
});

const updateEnrolledCourseMarks = catchAsync(async (req, res) => {
  const facultyId = req.user.userId;
  const result = await EnrolledCourseServices.updateEnrolledCourseMarksIntoDB(
    facultyId,
    req.body,
  );
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Marks is update successfully!',
    data: result,
  });
});
const getAllEnrolledCourses = catchAsync(async (req, res) => {
  const result = await EnrolledCourseServices.getAllEnrolledCoursesIntoDB( );
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Enrolled courses retrieve successfully!',
    data: result,
  });
});
export const EnrolledCourseControllers = {
  createEnrolledCourse,
  updateEnrolledCourseMarks,
  getAllEnrolledCourses
};
