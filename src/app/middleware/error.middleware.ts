import { Request, Response } from 'express';
import { ZodError } from 'zod';

const errorHandler = (err: Error, req: Request, res: Response) => {
  if (err instanceof ZodError) {
    const errors = err.errors.map((e) => ({
      path: e.path.join('.'),
      message: e.message,
    }));

    return res.status(400).json({
      message: 'Something went wrong',
      status: false,
      errors,
    });
  }
};

export default errorHandler;
