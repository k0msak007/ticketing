import express, { Request, Response } from "express";
import { body } from "express-validator";
import jwt from "jsonwebtoken"
import { validateRequest, BadRequestError } from "@sgtickets007/common";
import { User } from "../models/user";
import { Password } from "../services/password";

const router = express.Router();

router.post(
  "/api/users/signin",
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password")
      .trim()
      .notEmpty()
      .withMessage("Password must be required"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const {email, password} =  req.body

    const existingUser = await User.findOne({email})
    if(!existingUser) {
        throw new BadRequestError("Invalid Credentials")
    }

    const passwordsMatch = await Password.compare(existingUser.password, password)
    if(!passwordsMatch) {
        throw new BadRequestError("Invalid Credentials")
    }

    const userJwt = jwt.sign(
        {
          id: existingUser.id,
          email: existingUser.email,
        },
        process.env.JWT_KEY!
      );
  
      // console.log(userJwt);
  
      res.cookie("jwt", userJwt, {httpOnly: true,});
      // res.cookie("jwt", userJwt, {httpOnly: true, expires: new Date(new Date().getTime()+(30*1000))});
  

      res.status(200).send(existingUser);
  }
);

export { router as signinRouter };
