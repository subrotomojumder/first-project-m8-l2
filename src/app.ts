import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import globalErrorHandler from './app/middleware/globalErrorHandler';
import notFoundRoute from './app/middleware/notFoundRoute';
import router from './app/routes';
import cookieParser from 'cookie-parser';

const app: Application = express();

//parsers
app.use(express.json());
app.use(cookieParser())
app.use(cors({origin: ['http://localhost:5173']})); // origin e frontend root url dite hobe corse error na dorar jonno

// application routes
app.use('/api/v1', router);

// const test = (req, res) => {
//   // Promise.reject("custom error");
//   res.send("hell")
// };
// app.get('/test', test);
app.get('/', (req: Request, res: Response) => {
  const text: string = 'Hello World!';

  res.send(text);
});

// global error handler
app.use(globalErrorHandler);

// Not Found route
app.use(notFoundRoute);

export default app;
