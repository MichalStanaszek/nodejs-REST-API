import { promises as fs } from "fs";

const isAccessible = (folderPath) => {
  return fs
    .access(folderPath)
    .then(() => true)
    .catch(() => false);
};

export const createFolderIfNotExist = async (folderPath) => {
  if (!(await isAccessible(folderPath))) {
    await fs.mkdir(folderPath, { recursive: true });
  }
};

