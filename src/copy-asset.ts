import fs, { existsSync, lstatSync, mkdirSync, readFileSync } from 'fs';
import { glob } from 'glob';
import { uniq } from 'lodash';
import path from 'path';

// We have a problem with docker build
const nestCli = JSON.parse(readFileSync('nest-cli.json').toString());

copyAssets()
    .then(() => {
        console.log('Copy asset success');
    })
    .catch(console.error);

async function copyAssets() {
    const assets = nestCli.compilerOptions.assets;
    let files: string[] = [];
    for (const asset of assets) {
        files = files.concat(await getFilesFromGlob(`${nestCli.sourceRoot}/${asset.include}`));
    }
    files = uniq(files);
    for (const file of files) {
        if (isFile(file)) {
            const newPath = file.replace(`${nestCli.sourceRoot}/`, 'dist/');
            const dir = path.dirname(newPath);
            if (!existsSync(dir)) {
                mkdirSync(dir, { recursive: true });
            }
            fs.copyFileSync(file, newPath);
        }
    }
}

function isFile(filePath) {
    const stat = lstatSync(filePath);
    return stat.isFile();
}

function getFilesFromGlob(pattern: string): Promise<string[]> {
    return new Promise((resolve, reject) => {
        glob(pattern, (error, files) => {
            if (error) {
                reject(error);
            } else {
                resolve(files);
            }
        });
    });
}
