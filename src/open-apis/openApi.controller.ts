import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { join } from 'path';

@Controller()
export class OpenApiController {
    constructor() {}

    @Get('graphql-documents')
    document(@Res() res: Response): void {
        res.sendFile(join(__dirname, '..', '/static/spectaqls/index.html'));
    }
}
