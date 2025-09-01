import { stat, readdir, readFile, writeFile } from 'fs/promises';
import { spawn } from 'child_process';

/**
 * Check if a filepath is valid.
 * @param path {string}
 */
export async function exists(path) {
  try {
    await stat(path);
    return true;
  } catch (err) {}

  return false;
}

/**
 * Spawn a child process and executes the command asynchronously.
 * @param command {string}
 */
export function exec(command) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, { stdio: 'inherit', shell: true });

    child.on('exit', (code, signal) => {
      if (code === 0) {
        resolve({ code, signal });
      } else {
        reject(new Error(`Command '${command}' exited with code ${code} and signal ${signal}`));
      }
    });
  });
}

/**
 * Recursively read the files in a directory and return the paths.
 * @param args {string[]}
 * @return {Promise<string[]>}
 */
export async function getFiles(...args) {
  const files = await Promise.all(
    args.map(async (dir) => {
      try {
        const dirents = await readdir(`../${dir}/`, { withFileTypes: true });
        const paths = await Promise.all(
          dirents.map(async (dirent) => {
            const path = `${dir}/${dirent.name}`;
            const formattedPath = `${dir.replace('../', '')}/${dirent.name}`;
            return dirent.isDirectory() ? await getFiles(path) : formattedPath;
          })
        );

        return paths.flat();
      } catch (err) {
        return [];
      }
    })
  );

  return files.flat();
}

export async function readJson(path) {
  return JSON.parse(await readFile(path, 'utf8'));
}

/**
 * Reduces an array into a formatted string.
 * @param name - The name of the section.
 * @param files - The array of file names.
 * @returns The reduced string or an empty string if the array is empty.
 */
function reduceArray(name, files) {
  return files?.[0]
    ? `\n${name} {${files.reduce((acc, value) => {
        return value ? `${acc}\n\t'${value}',` : acc;
      }, "")}\n}\n`
    : "";
}

/**
 * Reduces an object into a formatted string.
 * @param object - The object to reduce.
 * @returns The reduced string.
 */
function reduceObject(object) {
  return Object.entries(object).reduce((acc, [key, value]) => {
    if (key === "lua54" || key === "version") {
      return value ? `${acc}${key} '${value}'\n\n` : acc;
    } else {
      return value ? `${acc}${key} '${value}'\n` : acc;
    }
  }, "");
}

/**
 * Creates the `fxmanifest.lua` file based on the resource manifest.
 * @param resourceManifest - The resource manifest containing script and file information.
 * @returns The generated `fxmanifest.lua` content as a string.
 */
export async function createFxmanifest(
  client_scripts,
  server_scripts,
  shared_scripts,
  files,
  dependencies,
  metadata,
) {
  const pkg = await readJson("package.json");
  const fxmanifest = {
    fx_version: "cerulean",
    game: "gta5",
    lua54: "yes",
    name: pkg.name,
    author: pkg.author,
    description: pkg.description,
    repository: pkg.repository?.url,
    license: pkg.license,
    version: pkg.version,
    ...(metadata || {}),
  };

  let output = reduceObject(fxmanifest);
  output += reduceArray("dependencies", dependencies);
  output += reduceArray("shared_scripts", shared_scripts);
  output += reduceArray("client_scripts", client_scripts);
  output += reduceArray("server_scripts", server_scripts);
  output += reduceArray("files", files);

  await writeFile("../fxmanifest.lua", output);

  return output;
}