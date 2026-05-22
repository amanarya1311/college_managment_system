const multer =
  require("multer");

const {
  CloudinaryStorage
} = require(
  "multer-storage-cloudinary"
);

const cloudinary =
  require("../config/cloudinary");

const storage =
  new CloudinaryStorage({

    cloudinary,

    params: async (
      req,
      file
    ) => ({

      folder:
        "college-management",

      resource_type:
        "auto",

      format:
        file.mimetype ===
        "application/pdf"
          ? "pdf"
          : undefined,

    }),

  });

const upload =
  multer({

    storage

  });

module.exports =
  upload;