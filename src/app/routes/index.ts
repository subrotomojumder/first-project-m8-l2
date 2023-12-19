import { Router } from 'express';
import { StudentRoutes } from '../modules/Student/student.route';
import { UserRoutes } from '../modules/user/user.route';
import { AcademicSemesterRoutes } from '../modules/academicSemester/academicSemester.route';
import { AcademicFacultyRoutes } from '../modules/academicFaculty/academicFaculty.route';
import { AcademicDepartmentRoutes } from '../modules/academicDepartment/academicDepartment.route';
import { FacultyRoutes } from '../modules/Faculty/faculty.route';
import { AdminRoutes } from '../modules/Admin/admin.route';
import { CourseRoutes } from '../modules/course/course.route';
import { SemesterRegistrationRoutes } from '../modules/semesterRegistration/semesterRegistration.route';
import { OfferedCourseRoutes } from '../modules/OfferedCourse/offeredCourse.route';
import { AuthRoutes } from '../modules/Auth/auth.route';

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
  {
    path: '/faculties',
    routeName: FacultyRoutes,
  },
  {
    path: '/admins',
    routeName: AdminRoutes,
  },
  {
    path: '/courses',
    routeName: CourseRoutes,
  },
  {
    path: '/semester-registration',
    routeName: SemesterRegistrationRoutes,
  },
  {
    path: '/offered-courses',
    routeName: OfferedCourseRoutes,
  },
  {
    path: '/auth',
    routeName: AuthRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.routeName));

export default router;
