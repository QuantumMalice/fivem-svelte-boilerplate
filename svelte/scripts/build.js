import { exists, exec, getFiles, createFxmanifest } from './utils.js';

const environments = [];
const outfiles = {}
const watch = process.argv.includes('--watch');

if (await exists('../client')) environments.push('client');
if (await exists('../server')) environments.push('server');

for (const context of environments) {
    const files = await getFiles(context);

    outfiles[context] = files
}

await exec(`cd ./ && vite ${watch ? 'build --watch' : 'build'}`);

const files = await getFiles('web');

await createFxmanifest(
    [...outfiles['client']],
    [...outfiles['server']],
    ['@ox_lib/init.lua'],
    [...files],
    ['/server:13068', '/onesync'],
    {
        ui_page: 'web/index.html',
        node_version: '22'
    },
);