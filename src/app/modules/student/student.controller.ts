import { StudentServices } from './student.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';

// use call catchAsync higher order function
const getAllStudent = catchAsync(async (req, res) => {
  const result = await StudentServices.getAllStudentsFromDB(req.query);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'All students are retrieved successfully!',
    data: result,
  });
});

const getSingleStudent = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await StudentServices.getSingleStudentFromDB(id);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'A student are retrieved successfully!',
    data: result,
  });
});

const updateStudent = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { student } = req.body;
  const result = await StudentServices.updateStudentFromDB(id, student);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Student is update successfully!',
    data: result,
  });
});
const deleteStudent = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await StudentServices.deleteStudentFromDB(id);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'A student are delete successfully!',
    data: result,
  });
});

export const StudentControllers = {
  getAllStudent,
  getSingleStudent,
  updateStudent,
  deleteStudent,
};
