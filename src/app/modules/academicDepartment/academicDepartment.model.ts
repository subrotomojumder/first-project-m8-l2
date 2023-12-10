import { Schema, model } from 'mongoose';
import { TAcademicDepartment } from './academicDepartment.interface';
import AppError from '../../errors/AppErrors';
import httpStatus from 'http-status';

const academicDepartmentSchema = new Schema<TAcademicDepartment>(
  {
    name: {
      type: String,
      required: [true, "name is required!"],
      unique: true,
    },
    academicFaculty: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'AcademicFaculty',
    },
  },
  {
    timestamps: true,
  },
);

// academicDepartmentSchema.pre('save', async function (next) {
//   const isExistsDepartment = await AcademicDepartment.findOne({
//     name: this.name,
//   });
//   if (isExistsDepartment) {
//     throw new AppError(httpStatus.FAILED_DEPENDENCY , this.name + ' ' + 'is already exists!');
//   }
//   next();
// });

academicDepartmentSchema.pre('findOneAndUpdate', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const query: any = this.getQuery(); // getQuery using for query id
  const isExistsDepartment = await AcademicDepartment.findOne(query);
  if (!isExistsDepartment) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'This department does not exists!',
    );
  }
  next();
});

export const AcademicDepartment = model<TAcademicDepartment>(
  'AcademicDepartment',
  academicDepartmentSchema,
);
