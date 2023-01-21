import { Response } from "express";

export class ErrorCode {
  public static readonly Unauthenticated = 'Unauthenticated';
  public static readonly NotFound = 'NotFound';
  public static readonly MaximumAllowedGrade = 'MaximumAllowedGrade';
  public static readonly AsyncError = 'AsyncError';
  public static readonly DuplicateEntityError = 'DuplicateEntityError';
  public static readonly ValidationError = 'ValidationError';

  public static readonly UnknownError = 'UnknownError';
}


export class ErrorException extends Error {
  public status: number;
  public metaData: any = null;

  constructor(code: string = ErrorCode.UnknownError, metaData: any = null) {
    super(code);
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = code;
    this.status = 500;
    this.metaData = metaData;
    
    switch (code) {
      case ErrorCode.Unauthenticated:
        this.status = 401;
        break;
      case ErrorCode.MaximumAllowedGrade:
      case ErrorCode.DuplicateEntityError:
      case ErrorCode.ValidationError:
        this.status = 400;
        break;
      case ErrorCode.AsyncError:
        this.status = 400;
        break;
      case ErrorCode.NotFound:
        this.status = 404;
        break;
      default:
        this.status = 500;
        break;
    }
  }
}


export const handleError = (res: Response, error: string, errorRaw?: any) => {
  console.log(errorRaw)
  res.status(500)
  res.send({ error })
}
