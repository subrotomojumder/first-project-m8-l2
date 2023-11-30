import { UsersServices } from './user.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';

const createStudent = catchAsync(async (req, res) => {
  const { password, student: studentData } = req.body;
  const result = await UsersServices.createStudentInToDB(password, studentData);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Student is successfully created!',
    data: result,
  });
});

export const UserControllers = {
  createStudent,
};
