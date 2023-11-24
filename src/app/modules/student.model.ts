import { Schema, model } from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcrypt';

import {
  TGuardian,
  TLocalGuardian,
  TStudent,
  TUserName,
  StudentModel,
  // StudentMethods,
} from './student/student.interface';
import config from '../config';

const userNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    trim: true,
    required: [true, 'First name is required!'],
    // maxlength: [20, 'First name cannot be more than 20 characters!'],
    // validate: {
    //   validator: function (value: string) {
    //     const firstNameStr: string =
    //       value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
    //     return firstNameStr === value;
    //   },
    //   message: '{VALUE} is not capitalize format!',
    // },
  },
  middleName: {
    type: String,
    trim: true,
  },
  lastName: {
    type: String,
    trim: true,
    required: [true, 'Last name is required!'],
    validate: {
      validator: (value: string) => validator.isAlpha(value),
      message: '{VALUE} is not valid!',
    },
  },
});
const guardianSchema = new Schema<TGuardian>({
  fatherName: {
    type: String,
    trim: true,
    required: [true, 'Name is required!'],
  },
  fatherOccupation: {
    type: String,
    trim: true,
    required: [true, 'Father occupation is required!'],
  },
  fatherContactNo: {
    type: String,
    trim: true,
    required: [true, 'Father contact number is required!'],
  },
  motherName: {
    type: String,
    trim: true,
    required: [true, 'Mother name is required!'],
  },
  motherOccupation: {
    type: String,
    trim: true,
    required: [true, 'Mather occupation is required!'],
  },
  motherContactNo: {
    type: String,
    trim: true,
    required: [true, 'Mother contact number is required!'],
  },
});
const localGuardianSchema = new Schema<TLocalGuardian>({
  name: {
    type: String,
    trim: true,
    required: [true, 'Name is required!'],
  },
  occupation: {
    type: String,
    trim: true,
    required: [true, 'Occupation is required!'],
  },
  contactNo: {
    type: String,
    trim: true,
    required: [true, 'Contact number is required!'],
  },
  address: {
    type: String,
    trim: true,
    required: [true, 'Address is required!'],
  },
});

const studentSchema = new Schema<TStudent, StudentModel>(
  {
    id: {
      type: String,
      unique: true,
      trim: true,
      required: [true, 'ID is required!'],
    },
    password: {
      type: String,
      trim: true,
      required: [true, 'password is required!'],
      maxlength: [20, '{VALUE} cannot be more than 20 characters!'],
    },
    name: {
      type: userNameSchema,
      trim: true,
      required: [true, 'Name is required'],
    },
    gender: {
      type: String,
      enum: {
        values: ['male', 'female', 'others'],
        message: '{VALUE} is not support!',
      },
      required: [true, 'Gender field is required!'],
    },
    dateOfBirth: String,
    email: {
      type: String,
      unique: true,
      trim: true,
      required: [true, 'Email Immediately required!'],
      // validate: {
      //   validator: (value: string)=> validator.isEmail(value),
      //   message: "{VALUE} is not valid!"
      // }
    },
    contactNo: {
      type: String,
      trim: true,
      required: [true, 'Contact number is required!'],
    },
    emergencyContactNo: {
      type: String,
      trim: true,
      required: [true, 'Emergency contact number is required!'],
    },
    bloodGroup: {
      type: String,
      enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
    },
    presentAddress: {
      type: String,
      trim: true,
      required: [true, 'Present address is required!'],
    },
    permanentAddress: {
      type: String,
      trim: true,
      required: [true, 'Permanent address is required!'],
    },
    guardian: {
      type: guardianSchema,
      required: [true, 'Guardian is required!'],
    },
    localGuardian: {
      type: localGuardianSchema,
      required: [true, 'Local guardian is required!'],
    },
    profileImg: { type: String },
    isActive: {
      type: String,
      enum: ['active', 'inactive'],
      default: 'active',
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  },
);
// virtual
studentSchema.virtual('fullName').get(function () {
  return `${this.name.firstName} ${this.name.middleName} ${this.name.lastName}`;
});

// document middleware/hook -v8
studentSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});
studentSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});

// query middleware
studentSchema.pre('find', async function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});
studentSchema.pre('findOne', async function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});
//aggregation middleware -v10
studentSchema.pre('aggregate', async function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } }); // ekhane aggregation pipeline er bitor unshift kore first ei match stage dokano hoiyece
  next();
});

// creating a custom static method -v7
studentSchema.statics.isUserExists = async function (id: strung) {
  const existUser = Student.findOne({ id });
  return existUser;
};

// for creating custom instance method -v6
// studentSchema.methods.isUserExists = async function (id:string) {
//   const existUser = await Student.findOne({id});
//   return existUser;
// }

export const Student = model<TStudent, StudentModel>('Student', studentSchema);
