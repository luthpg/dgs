import type { PathLike } from 'node:fs';
import fs from 'node:fs/promises';
export function pathExists(path: PathLike) {
  return fs
    .access(path)
    .then(() => true)
    .catch(() => false);
}
