// import {setCookies, UserPayload} from "@s_apollo/resolvers/auth/services";
// import {signJwt, TokenName, verifyJwt} from "@utils/jwt";
// import {RequestHandler} from "express";
// import jwt from "jsonwebtoken";
// import {CexRequestHandler} from "server/types/express";

// // export interface UserPayload extends jwt.JwtPayload {
// //   id: string;
// //   username: string;
// // }

// export const currentUser: CexRequestHandler = (req, res, next) => {
//   const {cookies} = req;
//   const {access_token, refresh_token} = cookies;

//   if (access_token) {
//     const payloadAccess = verifyJwt<UserPayload>(
//       access_token,
//       TokenName.ACCESS
//     );
//     if (payloadAccess) {
//       req.currentUser = payloadAccess.id;
//       return next();
//     }

//     const payloadReferesh = verifyJwt<UserPayload>(
//       refresh_token,
//       TokenName.REFRESH
//     );
//     if (payloadReferesh) {
//       const newAccessToken = signJwt(payloadReferesh, TokenName.ACCESS, {
//         expiresIn: "5m",
//       });
//       setCookies(res, {
//         accessToken: newAccessToken,
//         refreshToken: refresh_token,
//       });
//     }
//   }

//   return next();
// };
