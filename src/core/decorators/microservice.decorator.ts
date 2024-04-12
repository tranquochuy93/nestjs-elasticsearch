import { applyDecorators, Controller, UseFilters, UsePipes, ValidationPipe } from '@nestjs/common'

import { ValidateException } from '../exceptions/validate.exception'
import { HttpExceptionFilter } from '../filters/http-exception.filter'

// eslint-disable-next-line @typescript-eslint/ban-types
export function Microservice(): <TFunction extends Function, Y>(
  target: object | TFunction,
  propertyKey?: string | symbol,
  descriptor?: TypedPropertyDescriptor<Y>,
) => void {
  return applyDecorators(
    Controller(),
    UseFilters(HttpExceptionFilter),
    UsePipes(
      new ValidationPipe({
        whitelist: true,
        stopAtFirstError: true,
        exceptionFactory: errors => new ValidateException(errors),
      }),
    ),
  )
}
