export class HttpError extends Error {
  public status: number;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

export const isHttpError = <T extends { message: string; status?: number }>(
  err: HttpError | T,
): err is HttpError =>
  err instanceof HttpError ||
  (typeof err.status === "number" && typeof err.message === "string");
