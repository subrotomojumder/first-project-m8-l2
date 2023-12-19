import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { OfferedCourseServices } from "./offeredCourse.service";

const createOfferedCourse = catchAsync(async (req, res) => {
    const result = await OfferedCourseServices.createOfferedCourseInDB(req.body);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Offered course is created Successfully!',
      data: result,
    });
  });
  
  const getAllOfferedCourse = catchAsync(async (req, res) => {
    const result = await OfferedCourseServices.getAllOfferedCourseFromDB(req.query);
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Offered courses are retrieved successfully',
      data: result,
    });
  });
  
  const getSingleOfferedCourse = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result =
      await OfferedCourseServices.getSingleOfferedCourseFromDB(id);
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Offered course is retrieved successfully',
      data: result,
    });
  });
  
  const updateOfferedCourse = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await OfferedCourseServices.updateOfferedCourseInDB(
      id,
      req.body,
    );
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Offered course is updated successfully',
      data: result,
    });
  });
  const deleteOfferedCourse = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result =
      await OfferedCourseServices.deleteOfferedCourseFromDB(id);
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Offered course are delete successfully',
      data: result,
    });
  });
  export const OfferedCourseControllers = {
    createOfferedCourse,
    getAllOfferedCourse,
    getSingleOfferedCourse,
    updateOfferedCourse,
    deleteOfferedCourse
  };
  