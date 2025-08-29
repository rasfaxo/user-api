import { Request, Response, NextFunction } from "express";
import { UserService } from "../services/userService";
import { CreateUserData, UpdateUserData } from "../types/user";
import UserValidation from "../validation/User";
import { catchAsync } from "../utils/catchAsync";

/**
 * HTTP controller for user resources.
 * Each handler assumes prior validation & uses catchAsync to forward errors.
 */
export class UserController {
  static createUser = catchAsync(async (req: Request, res: Response) => {
    const data: CreateUserData = req.body;
    UserValidation.validateCreate(data);
    const user = await UserService.createUser(data);
    res.status(201).json({ success: true, data: user });
  });

  static getAllUsers = catchAsync(async (_req: Request, res: Response) => {
    const users = await UserService.getAllUsers();
    res.json({ success: true, data: users });
  });

  static updateUser = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const data: UpdateUserData = req.body;
    UserValidation.validateUpdate({ id: Number(id), ...data });
    const user = await UserService.updateUser(Number(id), data);
    res.json({ success: true, data: user });
  });

  static deleteUser = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    await UserService.deleteUser(Number(id));
    res.status(200).json({ success: true, message: "User deleted" });
  });
}
