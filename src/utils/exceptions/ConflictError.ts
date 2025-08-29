import ClientError from "./ClientError";

export default class ConflictError extends ClientError {
  constructor(message: string) {
    super(message, 409);
    this.name = "ConflictError";
  }
}
