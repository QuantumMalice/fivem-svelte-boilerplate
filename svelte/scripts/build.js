import { readFile, writeFile } from 'fs/promises';
import { exists, exec, getFiles, getPackage } from './utils.js';

const pkg = await getPackage();
let fxmanifest = `${await readFile('./src/__resource.lua', 'utf8')}
name '${pkg.name}'
author '${pkg.author}'
version '${pkg.version}'
description '${pkg.description}'\n`;

const environments = [];
const production = process.argv.includes('--mode=production');

fxmanifest += `\nui_page 'web/index.html'\n`;
fxmanifest += `\nshared_script '@ox_lib/init.lua'\n`;

if (await exists('../client')) environments.push('client');
if (await exists('../server')) environments.push('server');

for (const context of environments) {
    const files = await getFiles(`../${context}`);
    
    fxmanifest += `\n${context}_scripts {\n\t'${files.filter((file) => file).join("',\n\t'")}',\n}\n`;
};

await exec(`cd ./ && vite ${production ? 'build' : 'build --watch'}`);

const files = await getFiles('../web');

fxmanifest += `\nfiles {\n\t'${files.filter((file) => !file.endsWith('svg')).join("',\n\t'")}',\n}`;

writeFile('../fxmanifest.lua', fxmanifest);