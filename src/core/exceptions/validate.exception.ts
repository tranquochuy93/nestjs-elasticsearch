import { HttpStatus, ValidationError } from '@nestjs/common';
import { isString } from '@nestjs/common/utils/shared.utils';

export class ValidateException extends Error {
  public statusCode: number;
  public response: any;

  constructor(errors: ValidationError[]) {
    super();
    this.statusCode = HttpStatus.UNPROCESSABLE_ENTITY;
    this.response = this.convertValidationErrors(errors);
  }

  private convertValidationErrors(
    errors: ValidationError[],
    parent: ValidationError | null = null,
  ) {
    const newErrors: any = {};
    errors.forEach((error) => {
      if (!parent || error.property !== parent.property) {
        newErrors[error.property] = this.convertValidationError(error);
      }
    });
    console.log(newErrors);

    return newErrors;
  }

  private convertValidationError(error: ValidationError) {
    const newError: any = {
      children: undefined,
      messages: [],
    };
    if (error.constraints) {
      newError.messages = Object.values(error.constraints).map((message) => {
        if (isString(message)) {
          return {
            message: message,
            detail: {
              property: error.property,
            },
          };
        }
        return message;
      });
    }
    if (error.children && Object.keys(error.children).length) {
      error.children.forEach((child) => {
        if (child.property === error.property && child.constraints) {
          newError.messages = newError.messages.concat(
            Object.values(child.constraints),
          );
        }
      });
      newError.children = this.convertValidationErrors(error.children, error);
    }

    return newError;
  }
}
