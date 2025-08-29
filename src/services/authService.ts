import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { prisma } from "../services/prisma";
import { RegisterData, LoginData } from "../types/user";
import ConflictError from "../utils/exceptions/ConflictError";
import AuthenticationError from "../utils/exceptions/AuthenticationError";

/**
 * Authentication service handling credential storage (userAuth table) & JWT issuance.
 *
 * Security Notes:
 * - Passwords are hashed with bcrypt (cost=10). Adjust cost via env if needed for stronger hashing.
 * - JWT secret pulled from process.env.JWT_SECRET (fallback 'secret' for development only).
 * - Tokens currently expire in 1h; consider configurable expiry & refresh tokens for production.
 */
export class AuthService {
  /**
   * Register a new credential record and immediately issue a JWT.
   * @param data Registration payload (email, password).
   * @returns Success message + signed JWT token.
   * @throws {ConflictError} If email already registered.
   */
  static async register(
    data: RegisterData
  ): Promise<{ message: string; token: string }> {
    const existing = await prisma.userAuth.findUnique({
      where: { email: data.email },
    });
    if (existing) throw new ConflictError("Email already registered");

    const hash = await bcrypt.hash(data.password, 10);
    const user = await prisma.userAuth.create({
      data: { email: data.email, passwordHash: hash },
    });

    const secret = process.env.JWT_SECRET || "secret";
    const token = jwt.sign({ id: user.id, email: user.email }, secret, {
      expiresIn: "1h",
    });

    return { message: "Registered successfully", token };
  }

  /**
   * Authenticate a user and issue a JWT if credentials are valid.
   * @param data Login payload (email, password).
   * @returns Signed JWT token.
   * @throws {AuthenticationError} If credentials invalid.
   */
  static async login(data: LoginData): Promise<{ token: string }> {
    const user = await prisma.userAuth.findUnique({
      where: { email: data.email },
    });
    if (!user) throw new AuthenticationError("Invalid credentials");

    const match = await bcrypt.compare(data.password, user.passwordHash);
    if (!match) throw new AuthenticationError("Invalid credentials");

    const secret = process.env.JWT_SECRET || "secret";
    const token = jwt.sign({ id: user.id, email: user.email }, secret, {
      expiresIn: "1h",
    });
    return { token };
  }
}
