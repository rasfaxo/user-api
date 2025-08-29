import { Router } from "express";
import { auth } from "../middleware/auth";
import { validate } from "../middleware/validate";
import { UserController } from "../controllers/userController";
import {
  createUserSchema,
  updateUserSchema,
} from "../validation/user.validation";

const router = Router();

router.post("/", auth, validate(createUserSchema), UserController.createUser);

router.get("/", auth, UserController.getAllUsers);

router.put("/:id", auth, validate(updateUserSchema), UserController.updateUser);

router.delete("/:id", auth, UserController.deleteUser);

export const userRouter = router;
