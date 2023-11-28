// app/api/directory/route.ts
import fs from 'fs';
import util from 'util';
import path from 'path';
import { DirectoryTreeProps } from '@/components';
import { FileType } from '@/utils';

const readdir = util.promisify(fs.readdir);
const stat = util.promisify(fs.stat);

const getFileType = (stats: fs.Stats): FileType => {
  return stats.isFile() ? 'file' : (stats.isDirectory() ? 'directory' : 'unknown');
};

// Asynchronously read directory
const readDirToTreeAsync = async (dir: string, level: number = 0): Promise<DirectoryTreeProps> => {
  try {
    const entries = await readdir(dir, { withFileTypes: true });
    const children: any = entries.map(async (entry) => {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        return readDirToTreeAsync(fullPath, level + 1);
      }
      const stats = await stat(fullPath);
      const metaData = {
        ...entry,
        ...stats,
        name: entry.name,
        size: stats.size,
        type: getFileType(stats),
        level: level + 1,
      };
      return {
        ...metaData
      };
    });
    const dirStats = await stat(dir);
    const metaData: any = {
      ...dirStats,
      name: path.basename(dir),
      size: dirStats.size,
      type: getFileType(dirStats),
      children: await Promise.all(children),
      level,
    };
    return {
      ...metaData
    };
  } catch (error) {
    console.error(`Error reading directory ${dir}:`, error);
    throw error;
  }
};

// Synchronously read directory
const readDirToTreeSync = (dir: string, level: number = 0): DirectoryTreeProps => {
  try {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    const children: any = entries.map((entry) => {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        return readDirToTreeSync(fullPath, level + 1);
      }
      const stats = fs.statSync(fullPath);
      const directoryTreeProps = {
        name: entry.name,
        size: stats.size,
        type: getFileType(stats),
        level: level + 1,
      };
      const metaData: any = {...entry, ...stats, ...directoryTreeProps};
      return {
        ...metaData
      };
    });
    const dirStats = fs.statSync(dir);
    const directoryTreeProps = {
      name: path.basename(dir),
      size: dirStats.size,
      type: getFileType(dirStats),
      children,
      level,
    };
    const metaData: any = {...dirStats, ...directoryTreeProps};
    return {
      ...metaData,
    };
  } catch (error) {
    console.error(`Error reading directory ${dir}:`, error);
    throw error;
  }
};

// Read directory into tree format
const readDirToTree = (dir: string, level: number = 0, async: boolean = true): Promise<DirectoryTreeProps> | DirectoryTreeProps => {
  return async ? readDirToTreeAsync(dir, level) : readDirToTreeSync(dir, level);
};

// getDirectory API
const handler = async (request: Request): Promise<Response> => {
  if (request.method !== 'GET') {
    return new Response(JSON.stringify({ error: 'Method Not Allowed' }), { status: 405 });
  }

  const searchParameters = new URL(request.url).searchParams;
  const dir = searchParameters.get('dir');
  try {
    if (dir === null) {
      throw new Error('`dir` parameter is missing in request');
    };
    const tree = await readDirToTree(String(dir));
    return new Response(JSON.stringify(tree, null, 2), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: `Internal Server Error: ${error}` }), { status: 500 });
  }
};

export { handler as GET, handler as POST };
