import { Router } from 'express';
import { StudentRoutes } from '../modules/Student/student.route';
import { UserRoutes } from '../modules/user/user.route';
import { AcademicSemesterRoutes } from '../modules/academicSemester/academicSemester.route';
import { AcademicFacultyRoutes } from '../modules/academicFaculty/academicFaculty.route';
import { AcademicDepartmentRoutes } from '../modules/academicDepartment/academicDepartment.route';
import { FacultyRoutes } from '../modules/Faculty/faculty.route';
import { AdminRoutes } from '../modules/Admin/admin.route';
import { CourseRoutes } from '../modules/course/course.route';
import { AuthRoutes } from '../modules/Auth/auth.route';
import { EnrolledCourseRoutes } from '../modules/EnrolledCourse/enrolledCourse.route';
import { offeredCourseRoutes } from '../modules/OfferedCourse/offeredCourse.route';
import { semesterRegistrationRoutes } from '../modules/semesterRegistration/semesterRegistration.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/users',
    routeName: UserRoutes,
  },
  {
    path: '/students',
    routeName: StudentRoutes,
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
    path: '/courses',
    routeName: CourseRoutes,
  },
  {
    path: '/semester-registrations',
    routeName: semesterRegistrationRoutes,
  },
  {
    path: '/offered-courses',
    routeName: offeredCourseRoutes,
  },
  {
    path: '/auth',
    routeName: AuthRoutes,
  },
  {
    path: '/enrolled-courses',
    routeName: EnrolledCourseRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.routeName));

export default router;
