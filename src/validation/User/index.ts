import InvariantError from "../../utils/exceptions/InvariantError";
import { createUserSchema, updateUserSchema } from "../user.validation";

interface UserPayload {
  id?: number;
  name?: string;
  email?: string;
  phone?: string;
  isActive?: boolean;
  department?: string | null;
}

/**
 * Object-style validation utility for user payloads.
 * Throws InvariantError on first validation failure.
 */
const UserValidation = {
  validateCreate(payload: UserPayload): void {
    const { error } = createUserSchema.validate(payload);
    if (error)
      throw new InvariantError(
        error.details?.[0]?.message || "Validation error"
      );
  },
  validateUpdate(payload: UserPayload): void {
    const { error } = updateUserSchema.validate(payload);
    if (error)
      throw new InvariantError(
        error.details?.[0]?.message || "Validation error"
      );
  },
};

export default UserValidation;
