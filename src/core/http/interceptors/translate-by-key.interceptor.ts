import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { I18nService } from 'nestjs-i18n';
import { map } from 'rxjs/operators';

@Injectable()
export class TranslateByKeyInterceptor implements NestInterceptor {
  constructor(private reflector: Reflector, private i18nService: I18nService) {}

  intercept(context: ExecutionContext, next: CallHandler) {
    return next.handle().pipe(map((data) => this.translate(data, context)));
  }

  private async translateNestedProperties(
    item,
    nestedKeys: string[],
    language: string,
  ) {
    for (let nestedKey of nestedKeys) {
      const [property, translatedKey] = nestedKey.split('.');
      const nestedProperty = item[property];
      if (Array.isArray(nestedProperty)) {
        item[property] = await Promise.all(
          item[property].map(async (values) => ({
            ...values,
            [translatedKey]: await this.i18nService.translate(
              values[translatedKey],
              {
                lang: language,
              },
            ),
          })),
        );
      } else {
        item[property] = await this.i18nService.translate(
          nestedProperty[translatedKey],
          {
            lang: language,
          },
        );
      }
    }
    return item;
  }

  async translate(data, context: ExecutionContext) {
    let language = context.switchToHttp().getRequest().i18nLang;
    const normalKeys = this.reflector.get<string[]>(
      'translateKeys',
      context.getHandler(),
    );
    const nestedKeys = this.reflector.get<string[]>(
      'translateNestedKeys',
      context.getHandler(),
    );

    for (let key of normalKeys) {
      if (Array.isArray(data)) {
        for (let item of data) {
          item[key] = await this.i18nService.translate(item[key], {
            lang: language,
          });
          await this.translateNestedProperties(item, nestedKeys, language);
        }
      } else {
        data[key] = await this.i18nService.translate(data[key], {
          lang: language,
        });
      }
    }
    return data;
  }
}
