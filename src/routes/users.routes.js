import { Router } from "express";

import { UserController } from "../controllers/user.controller.js";

export const userRouter = Router();

const userController = new UserController();

userRouter.get("/", userController.getAll);
userRouter.get("/:uid", userController.getById);
userRouter.post("/", userController.create);
userRouter.put("/:uid", userController.update);
userRouter.delete("/:uid", userController.delete);

