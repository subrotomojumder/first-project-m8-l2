import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AcademicDepartmentServices } from "./academicDepartment.service";

const createAcademicDepartment = catchAsync(async (req, res) => {
    const result = await AcademicDepartmentServices.createAcademicDepartmentInDB(
      req.body,
    );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic department is created Successfully!',
      data: result,
    });
  });
  
  const getAllAcademicDepartment = catchAsync(async (req, res) => {
    const result = await AcademicDepartmentServices.getAllAcademicDepartmentFromDB();
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic departments are retrieved successfully',
      data: result,
    });
  });
  
  const getSingleAcademicDepartment = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result =
      await AcademicDepartmentServices.getSingleAcademicDepartmentFromDB(id);
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic Department is retrieved successfully',
      data: result,
    });
  });
  
  const updateAcademicDepartment = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await AcademicDepartmentServices.updateAcademicDepartmentInDB(
      id,
      req.body,
    );
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic Department is update successfully',
      data: result,
    });
  });
  
  export const AcademicDepartmentControllers = {
    createAcademicDepartment,
    getAllAcademicDepartment,
    getSingleAcademicDepartment,
    updateAcademicDepartment,
  };
  