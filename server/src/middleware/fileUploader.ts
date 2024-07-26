import multer from "multer";
import { RequestHandler } from "express";

export const uploadFile: RequestHandler = (req, res, next) => {
  const storage = multer.diskStorage({
    destination: "uploads/",
    filename: function (_req, file, cb) {
      cb(null, Date.now() + "-" + file.originalname);
    },
  });

  const upload = multer({ storage: storage }).single("import");
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      console.error(err);
      // A Multer error occurred when uploading.
    } else if (err) {
      console.error(err);
      // An unknown error occurred when uploading.
    }
    // Everything went fine.
    next();
  });
};
