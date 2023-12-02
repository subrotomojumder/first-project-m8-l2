import { Router } from 'express';
import { StudentRoutes } from '../modules/student/student.route';
import { UserRoutes } from '../modules/user/user.route';
import { AcademicSemesterRoutes } from '../modules/academicSemester/academicSemester.route';

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
];

moduleRoutes.forEach((route) => router.use(route.path, route.routeName));

export default router;
