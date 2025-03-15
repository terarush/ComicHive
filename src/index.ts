import express, { Request, Response, NextFunction } from 'express';
import { ZodError } from "zod";
import { m } from './router';
import createError from 'http-errors';

const app = express();

app.use(express.json());
app.use('/api/v1', m);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof createError.HttpError) {
    res.status(err.statusCode || 500);
    res.json({
      errors: [{ message: err.message }],
    });
  } else if (err instanceof ZodError) {
    res.status(400);
    res.json({
      errors: err.errors,
    });
  } else {
    res.status(500);
    res.json({
      errors: [{ message: err.message }],
    });
  }
console.log(err.message, err);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
