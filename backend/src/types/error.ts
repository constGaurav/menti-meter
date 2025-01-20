export class AppError extends Error {
  constructor(
    public status: number,
    public message: string,
    public code?: string,
    public data?: any
  ) {
    super(message);
    this.name = "AppError";
    Object.setPrototypeOf(this, AppError.prototype);
  }
}
