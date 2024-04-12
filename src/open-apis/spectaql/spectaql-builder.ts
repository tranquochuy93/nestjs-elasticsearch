import { run } from 'spectaql';
import { env } from '~config/env.config';

export class SpectaqlBuilder {
    private spectaqlOptions: any;

    constructor() {
        this.spectaqlOptions = {
            specFile: `${env.ROOT_PATH}/open-apis/spectaql/config.yaml`,
            resolveWithOutput: true
        };
    }

    async build() {
        await run(this.spectaqlOptions);
    }
}
