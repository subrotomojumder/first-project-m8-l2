import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { CourseServices } from './course.service';

const createCourse = catchAsync(async (req, res) => {
  const result = await CourseServices.createCourseInDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Successfully course created!',
    data: result,
  });
});
const getAllCourse = catchAsync(async (req, res) => {
  const result = await CourseServices.getAllCourseInDB(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All Course are retrieved successfully',
    data: result,
  });
});

const getSingleCourse = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await CourseServices.getSingleCourseInDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course is retrieved successfully',
    data: result,
  });
});

const updateCourse = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await CourseServices.updateCourseInDB(id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course is updated successfully',
    data: result,
  });
});

const deleteCourse = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await CourseServices.deleteCourseInDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course is deleted successfully',
    data: result,
  });
});
const assignFacultiesWithCourse = catchAsync(async (req, res) => {
  const { courseId } = req.params;
  const { faculties } = req.body;
  const result = await CourseServices.assignFacultiesWithCourseInDB(courseId, faculties);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculties assign successful',
    data: result,
  });
});
const removeFacultiesFromCourse = catchAsync(async (req, res) => {
  const { courseId } = req.params;
  const { faculties } = req.body;
  const result = await CourseServices.removeFacultiesFromCourseInDB(courseId, faculties);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculties remove successful',
    data: result,
  });
});
export const CourseControllers = {
  createCourse,
  getAllCourse,
  getSingleCourse,
  updateCourse,
  deleteCourse,
  assignFacultiesWithCourse,
  removeFacultiesFromCourse
};
