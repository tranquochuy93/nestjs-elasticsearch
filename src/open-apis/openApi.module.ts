import { Module } from '@nestjs/common';
import { OpenApiController } from './openApi.controller';

@Module({
    imports: [],
    controllers: [OpenApiController],
    providers: []
})
export class OpenApiModule {}
