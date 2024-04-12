import { applyDecorators, SetMetadata, UseInterceptors } from '@nestjs/common';
import { TranslateByKeyInterceptor } from '../http/interceptors/translate-by-key.interceptor';

export function TranslateByKey(...keys: string[]) {
  const normalKeys: string[] = keys.filter((key) => !key.includes('.'));
  const nestedKeys: string[] = keys.filter((key) => key.includes('.'));
  return applyDecorators(
    SetMetadata('translateKeys', normalKeys),
    SetMetadata('translateNestedKeys', nestedKeys),
    UseInterceptors(TranslateByKeyInterceptor),
  );
}
