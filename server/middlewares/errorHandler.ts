import {ErrorRequestHandler} from "express";

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.log("Error handler");
  if (err) {
    console.log(err);
  }
};
