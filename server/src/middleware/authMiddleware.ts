import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const protect = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    console.log(authHeader)
    try {
      const token = authHeader.split(" ")[1];
      console.log("test route with secret:", process.env.JWT_secret);
      console.log("token on after login:", token);
      const decoded = jwt.verify(token, process.env.JWT_secret as string) as { id: string };
      req.user = { id: decoded.id };
      next();
    } catch (err) {
        console.log(err);
      return res.status(401).json({ message: "Not authorized, invalid token" });
    }
  } else {
    return res.status(401).json({ message: "Not authorized, no token" });
  }
};