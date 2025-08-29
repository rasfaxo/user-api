import { Request, Response } from "express";
import { AuthService } from "../services/authService";
import { RegisterData, LoginData } from "../types/user";
import { catchAsync } from "../utils/catchAsync";

/**
 * HTTP controller for authentication endpoints (register & login).
 * Responses standardized to include success, message, token.
 */
export class AuthController {
  static register = catchAsync(async (req: Request, res: Response) => {
    const data: RegisterData = req.body;
    const result = await AuthService.register(data);
    res
      .status(201)
      .json({ success: true, message: result.message, token: result.token });
  });

  static login = catchAsync(async (req: Request, res: Response) => {
    const data: LoginData = req.body;
    const result = await AuthService.login(data);
    res.json({
      success: true,
      message: "Login successful",
      token: result.token,
    });
  });
}
