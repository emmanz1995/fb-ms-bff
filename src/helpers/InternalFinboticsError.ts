import { AxiosError } from 'axios';

class InternalFinboticsError extends Error {
  public isAxiosError: boolean;
  public statusCode: number;
  public errorReason: string;
  public metadata: object;
  public errors: object;

  constructor(
    message: string,
    options: {
      statusCode?: number;
      isAxiosError?: boolean;
      errorReason?: string;
      metadata?: object;
    } = {}
  ) {
    super(message);
    this.message = message;
    this.isAxiosError = options.isAxiosError ?? false;
    this.statusCode = options.statusCode ?? 500;
    this.errorReason = options.errorReason ?? '';
    this.metadata = options.metadata ?? {};
    this.errors = {
      message: this.message,
      ...(this.isAxiosError && { isAxiosError: this.isAxiosError }),
      statusCode: this.statusCode,
      errorReason: this.errorReason,
      metadata: this.metadata,
    };

    Object.setPrototypeOf(this, new.target.prototype);
    Error.captureStackTrace(this, this.constructor);
  }

  public static setAxiosError(error: AxiosError) {
    const statusCode = error.response?.status || 500;
    const message = error?.message || 'Internal Server Error';

    return new InternalFinboticsError(message, {
      statusCode,
      isAxiosError: true,
      errorReason: error?.cause?.toString() || '',
      metadata: {
        url: error.config?.url,
        method: error.config?.method,
        response: error.response?.data,
      },
    });
  }
}

export default InternalFinboticsError;
