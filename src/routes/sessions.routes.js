import { Router } from "express";

import { login, logout, register } from "../controllers/auth.controller.js";
import passport from "passport";
import { validate, validateRegister } from "../middlewares/validate.js";
import {userDto} from "../dto/user.dto.js";
export const authRouter = Router();

authRouter.post("/register", validate(userDto), validateRegister , register);
authRouter.post("/login", passport.authenticate('login', {session: false}), login);
authRouter.post("/logout", passport.authenticate('jwt', {session: false}), logout);

