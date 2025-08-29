import { prisma } from "../services/prisma";
import { User, CreateUserData, UpdateUserData } from "../types/user";
import ConflictError from "../utils/exceptions/ConflictError";
import NotFoundError from "../utils/exceptions/NotFoundError";

/**
 * Service layer encapsulating all user-related data access & business rules.
 *
 * Error Contracts:
 * - ConflictError: thrown when creating/updating with an email that already exists.
 * - NotFoundError: thrown when operating on a non-existent user id.
 */
export class UserService {
  /**
   * Create a new user.
   *
   * @param data Create payload (name, email, phone, department?, isActive?)
   * @returns The created User record.
   * @throws {ConflictError} If email already exists.
   * @example
   * const user = await UserService.createUser({ name: 'Alice', email: 'a@a.com', phone:'123'});
   */
  static async createUser(data: CreateUserData): Promise<User> {
    const existing = await prisma.user.findUnique({
      where: { email: data.email },
    });
    if (existing) throw new ConflictError("Email already exists");
    return prisma.user.create({ data });
  }

  /**
   * Retrieve all users ordered by newest first.
   * @returns Array of users.
   */
  static async getAllUsers(): Promise<User[]> {
    return prisma.user.findMany({ orderBy: { createdAt: "desc" } });
  }

  /**
   * Get a user by primary id.
   * @param id User id.
   * @returns User or null if not found.
   */
  static async getUserById(id: number): Promise<User | null> {
    return prisma.user.findUnique({ where: { id } });
  }

  /**
   * Update an existing user.
   * Performs existence + conditional email uniqueness checks.
   * @param id User id.
   * @param data Partial update payload.
   * @returns Updated User.
   * @throws {NotFoundError} If user not found.
   * @throws {ConflictError} If updating to an email already in use.
   */
  static async updateUser(id: number, data: UpdateUserData): Promise<User> {
    const existing = await this.getUserById(id);
    if (!existing) throw new NotFoundError("User not found");

    if (data.email && data.email !== existing.email) {
      const dup = await prisma.user.findUnique({
        where: { email: data.email },
      });
      if (dup) throw new ConflictError("Email already exists");
    }
    return prisma.user.update({ where: { id }, data });
  }

  /**
   * Delete a user by id.
   * @param id User id.
   * @throws {NotFoundError} If user not found.
   */
  static async deleteUser(id: number): Promise<void> {
    const existing = await this.getUserById(id);
    if (!existing) throw new NotFoundError("User not found");
    await prisma.user.delete({ where: { id } });
  }
}
