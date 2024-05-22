const jwt = require("jsonwebtoken");
import express from "express";
import { UnauthorizedError } from "../helpers/api-errors";
import { getUserById } from "../User/userService";
type JwtPayload = {
  id: number;
};

export const authMiddleware = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const { authorization } = req.headers;

  if (!authorization) {
    throw new UnauthorizedError("Não autorizado");
  }

  const token = authorization.split(" ")[1];

  try {
    const { id } = jwt.verify(token, process.env.SECRET ?? "") as JwtPayload;

    const user = await getUserById(id);

    if (!user) {
      throw new UnauthorizedError("Não autorizado");
    }

    //@ts-ignore
    req.user = user;

    next();
  } catch (error) {
    console.error(error);
    throw new UnauthorizedError("Não autorizado");
  }
};
