import { Router } from 'express';
import { StudentRoutes } from '../modules/student/student.route';
import { UserRoutes } from '../modules/user/user.route';
import { AcademicSemesterRoutes } from '../modules/academicSemester/academicSemester.route';
import { AcademicFacultyRoutes } from '../modules/academicFaculty/academicFaculty.route';
import { AcademicDepartmentRoutes } from '../modules/academicDepartment/academicDepartment.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/students',
    routeName: StudentRoutes,
  },
  {
    path: '/users',
    routeName: UserRoutes,
  },
  {
    path: '/academic-semesters',
    routeName: AcademicSemesterRoutes,
  },
  {
    path: '/academic-faculties',
    routeName: AcademicFacultyRoutes,
  },
  {
    path: '/academic-departments',
    routeName: AcademicDepartmentRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.routeName));

export default router;
