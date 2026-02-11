import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";

export const validateToken = asyncHandler(async (req, res, next) => {
  // let token;
  // let authHeader = req.headers.Authorization || req.headers.authorization;
  // if (authHeader && authHeader.startsWith("Bearer")) {
  //   token = authHeader.split(" ")[1];
  //   jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
  //     if (err) {
  //       res.status(401);
  //       throw new Error("User is not authorized");
  //     }
  //     console.log(decoded);
  //     req.user = decoded.user;
  //     next();
  //   });

  //   if (!token) {
  //     res.status(401);
  //     throw new Error("User is not authorized or token is missing");
  //   }
  // }
  const token = req.cookies.token;
  console.log(`Token is: ${token}`);
  if (!token) {
    return res
      .status(401)
      .json({ message: "Unauthorized user or token is missing" });
  }

  const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  console.log(`Decoded data:  `, decoded);
  req.user = decoded;
  next();
});
