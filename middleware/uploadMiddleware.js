import multer from "multer";
import path from "path";
import { createFolderIfNotExist } from "#helpers/index.js";

const tempDir = path.join(process.cwd(), "temp");
const storageImage = path.join(process.cwd(), "public/avatars");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, tempDir);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const extensionWhiteList = [".jpg", ".jpeg", ".png", ".gif"];
const mimetypeWhiteList = ["image/jpg", "image/jpeg", "image/png", "image/gif"];

export const uploadMiddleware = multer({
  storage,
  fileFilter: async (req, file, cb) => {
    const extension = path.extname(file.originalname).toLocaleLowerCase();
    const mimetype = file.mimetype;

    if (
      !extensionWhiteList.includes(extension) ||
      !mimetypeWhiteList.includes(mimetype)
    ) {
      return cb(null, false);
    }
    return cb(null, true);
  },
  limits: {
    fileSize: 1048576, //1024*1024=2MB
  },
});

createFolderIfNotExist(tempDir);
createFolderIfNotExist(storageImage);
