import express from "express";

export interface CexRequest extends express.Request {
  currentUser?: string;
}

export interface CexResponse extends express.Response {}

export type CexRequestHandler = (
  req: CexRequest,
  res: CexResponse,
  next: express.NextFunction
) => void;
