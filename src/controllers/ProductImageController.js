import { Op } from "sequelize";
import db from "../models";

export async function getProductImages(req, res) {
  const { product_id, search = "", page = 1 } = req.query;
  const pageSize = 5;
  const offset = (page - 1) * pageSize;

  let whereClause = {};
  if (product_id !== "" || search.trim() !== "") {
    whereClause = {
      image: { [Op.like]: `%${search}%` },
      product_id: product_id,
    };
  }

  const [productImages, totalImages] = await Promise.all([
    db.ProductImage.findAll({
      where: whereClause,
      limit: pageSize,
      offset: offset,
      // include: [{ model: db.Product, as: "product" }],
    }),
    db.ProductImage.count({ where: whereClause }),
  ]);

  return res.status(200).json({
    message: "Get product images success",
    data: productImages,
    current_page: parseInt(page, 10),
    total_pages: Math.ceil(totalImages / pageSize),
    total_images: totalImages,
  });
}

// GET by id
export async function getProductImageById(req, res) {
  const { id } = req.params;
  const image = await db.ProductImage.findByPk(id);
  if (!image) {
    return res.status(404).json({
      message: "Product image not found",
    });
  }
  return res.status(200).json({
    message: "Get product image successfully",
    data: image,
  });
}

// INSERT
export async function insertProductImage(req, res) {
  const { product_id, image } = req.body;
  const product = await db.Product.findByPk(product_id);
  if (!product) {
    return res.status(404).json({
      message: "Product Not Found",
    });
  }
  const existingImage = await db.ProductImage.findOne({
    where: {
      product_id: product_id,
      image: image,
    },
  });
  if (existingImage) {
    return res.status(409).json({
      message: "Image already exist with Product",
    });
  }
  const imageProduct = await db.ProductImage.create(req.body);
  return res.status(201).json({
    message: "Insert product image successfully",
    data: imageProduct,
  });
}

// UPDATE
export async function updateProductImage(req, res) {
  const { id } = req.params;

  const updated = await db.ProductImage.update(req.body, {
    where: { id },
  });

  if (updated[0] > 0) {
    return res.status(200).json({
      message: "Update product image successfully",
    });
  } else {
    return res.status(404).json({
      message: "Product image not found",
    });
  }
}

// DELETE
export async function deleteProductImage(req, res) {
  const { id } = req.params;
  const deleted = await db.ProductImage.destroy({
    where: { id },
  });

  if (!deleted) {
    return res.status(404).json({
      message: "Product image not found",
    });
  } else {
    return res.status(200).json({
      message: "Delete product image successfully",
    });
  }
}
