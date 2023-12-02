export type TMonths =
  | 'January'
  | 'February'
  | 'March'
  | 'April'
  | 'May'
  | 'June'
  | 'July'
  | 'August'
  | 'September'
  | 'October'
  | 'November'
  | 'December';
export type IAcademicSemesterName =  'Autumn' | 'Summer' | 'Fall';
export type IAcademicSemesterCode =  '01' | '02' | '03';

export type TAcademicSemester = {
  name: IAcademicSemesterName;
  code:IAcademicSemesterCode;
  year: string;
  startMonth: TMonths;
  endMonth: TMonths;
};

export type TAcademicSemesterNameCode = {
  [key: string]: string;
};