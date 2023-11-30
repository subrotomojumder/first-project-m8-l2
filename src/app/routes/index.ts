import { Router } from 'express';
import { StudentRoutes } from '../modules/student/student.route';
import { UserRoutes } from '../modules/user/user.route';

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
];

moduleRoutes.forEach((route) => router.use(route.path, route.routeName));

export default router;
