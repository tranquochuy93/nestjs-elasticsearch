// import { NestExpressApplication } from '@nestjs/platform-express';
// import { InfoObject, OpenAPIObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';
// import { readFileSync } from 'fs';
// import yaml from 'js-yaml';
// import { env } from '~config/env.config';
// import { DOCUMENT_LOGO_URL } from '~open-apis/constants/document-logo.constant';

// export class ReDocBuilder {
//     private redocOptions: RedocModuleOptions;

//     constructor(private app: NestExpressApplication, private document: OpenAPIObject) {
//         this.redocOptions = {
//             title: 'Redoc API',
//             logo: {
//                 url: DOCUMENT_LOGO_URL,
//                 backgroundColor: '#F0F0F0'
//             },
//             skipSnippetsGeneration: true
//         };
//     }

//     async build(publicDoc: OpenAPIObject) {
//         this.loadMetaData(publicDoc);

//         await RedocTryOutModule.setup(`/re-docs`, this.app, this.document, this.redocOptions);
//     }

//     private async loadMetaData(publicDoc: OpenAPIObject) {
//         const documentInfo = yaml.load(
//             readFileSync(`${env.ROOT_PATH}/open-apis/descriptions/api-description.yaml`, { encoding: 'utf-8' })
//         ) as InfoObject;
//         publicDoc.info.description = documentInfo.description;
//     }
// }
