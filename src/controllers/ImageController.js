/**
 * Upload file to local server
 * Upload images to Google Firebase(Filestore)
 * Cloundinary, AWS, ...
 */
import db, { Sequelize } from "../models";
import path from "path";
import fs from "fs";
import { getDownloadURL, uploadBytesResumable } from "firebase/storage";
export async function uploadImages(req, res) {
  if (req.files.length === 0) {
    throw new Error("Images Not Found");
  }

  const uploadedImagesPaths = req.files.map((file) =>
    path.basename(file.path).trim()
  );

  return res.status(201).json({
    message: "Upload Images Success",
    files: uploadedImagesPaths,
  });
}

export async function uploadImageToGoogleStorage(req, res) {
  if (req.files.length === 0) {
    throw new Error("upload Image Failed");
  }

  const dateTime = new Date().toISOString();
  const newFileName = `${Date.now()}-${file.originalname}`;
  const storageRef = ref(storage, `images/${newFileName}`);

  const snapshot = await uploadBytesResumable(storageRef, req.file.buffer, {
    contentType: req.file.mimetype,
  });

  const downloadURL = await getDownloadURL(snapshot.ref);

  return res.status(201).json({
    message: "Upload Image success",
    files: downloadURL,
  });
}

export async function viewImage(req, res) {
  const { fileName } = req.params;
  const imagePath = path.join(path.join(__dirname, "../uploads/"), fileName);
  fs.access(imagePath, fs.constants.F_OK, (error) => {
    if (error) {
      return res.status(404).send("Image not found");
    }
    res.sendFile(imagePath);
  });
}

export async function deleteImage(req, res) {
  const { url: rawUrl } = req.body;
  const url = rawUrl.trim();
  const isUse = await checkImageInUse(url);

  const filePath = path.join(__dirname, "../uploads/", path.basename(url));

  if (fs.existsSync(filePath)) {
    if (isUse) {
      return res.status(500).json({
        message: "Image In Use",
      });
    }
    fs.unlinkSync(filePath);
    return res.status(200).json({
      message: "Delete Images Success",
    });
  } else {
    return res.status(404).json({
      message: "Image Not Found",
    });
  }
}

async function checkImageInUse(imageUrl) {
  const modelFields = [
    { model: db.User, fields: ["avatar"] },
    { model: db.Category, fields: ["image"] },
    { model: db.Brand, fields: ["image"] },
    { model: db.Product, fields: ["image"] },
    { model: db.News, fields: ["image"] },
    { model: db.Banner, fields: ["image"] },
    { model: db.ProductImage, fields: ["image"] },
  ];

  for (let { model, fields } of modelFields) {
    for (let field of fields) {
      const where = {};
      where[field] = imageUrl;
      const result = await model.findOne({ where });
      if (result) {
        console.error(
          `Found in model: ${model.name},
           Field: ${field},
            Image URL: ${imageUrl}`
        );
        return true;
      }
    }
  }
  return false;
}
