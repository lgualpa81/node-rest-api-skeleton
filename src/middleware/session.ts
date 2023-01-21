import { NextFunction, Request, Response } from "express";
import { RequestExt } from "../interfaces/req-ext";
import { verifyToken } from "../utils/jwt.handle";

const checkJwt = (req: RequestExt, res: Response, next: NextFunction) => {
  try {
    const authHeader: string = req.headers.authorization || "";
    const jwt: string = authHeader && authHeader.split(" ").pop()!;
    if (jwt == null) return res.sendStatus(401)

    const isUser = verifyToken(`${jwt}`) as { id: string };
    if (!isUser) {
      res.status(401);
      res.json("Invalid token");
    } else {
      req.user = isUser;
      next();
    }
  } catch (e) {
    //console.log({ e });
    res.status(400);
    res.json("Invalid session");
  }
};

export { checkJwt };