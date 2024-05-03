import { NextFunction, Request, Response } from "express";

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {

  console.error(`[${new Date().toISOString()}] ${req.method} ${req.url} - ${err.message}`);

  const statusCode = err instanceof SyntaxError ? 400 : 500;

  res.status(statusCode).json({ error: err.message });
};
