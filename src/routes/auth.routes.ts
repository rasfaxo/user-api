import { Router } from "express";
import { validate } from "../middleware/validate";
import { AuthController } from "../controllers/authController";
import { registerSchema, loginSchema } from "../validation/auth.validation";

const router = Router();

router.post("/register", validate(registerSchema), AuthController.register);

router.post("/login", validate(loginSchema), AuthController.login);

export const authRouter = router;
