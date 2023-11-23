import { Request, Response } from 'express';
import { StudentServices } from './student.service';
// import studentJoiValidationSchema from './student.Joi.Validation';
import studentZodValidationSchema from './student.zod.validation';

const createStudent = async (req: Request, res: Response) => {
  try {
    const { student: studentData } = req.body;
    // zod data validation
    const zodParseData = studentZodValidationSchema.parse(studentData);
    //joi data validation
    // const { error, value } = studentJoiValidationSchema.validate(studentData);
    const result = await StudentServices.createStudentInToDB(zodParseData);
    res.status(200).json({
      success: true,
      message: 'Student is successfully created!',
      data: result,
    });
  } catch (error : any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Something went wrong!',
      error: error,
    });
  }
};

const getAllStudent = async (req: Request, res: Response) => {
  try {
    const result = await StudentServices.getAllStudentsFromDB();
    res.status(200).json({
      success: true,
      message: 'All students are retrieved successfully!',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message ||  'Something went wrong!',
      error: error,
    });
  }
};
const getSingleStudent = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;
    const result = await StudentServices.getSingleStudentFromDB(studentId);
    res.status(200).json({
      success: true,
      message: 'A student are retrieved successfully!',
      data: result,
    });
  } catch (error:any) {
    res.status(500).json({
      success: false,
      message:error.message ||  'Something went wrong!',
      error: error,
    });
  }
};
const deleteStudent = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;
    const result = await StudentServices.deleteStudentFromDB(studentId);
    res.status(200).json({
      success: true,
      message: 'A student are delete successfully!',
      data: result,
    });
  } catch (error:any) {
    res.status(500).json({
      success: false,
      message:error.message ||  'Something went wrong!',
      error: error,
    });
  }
};

export const StudentControllers = {
  createStudent,
  getAllStudent,
  getSingleStudent,
  deleteStudent
};
