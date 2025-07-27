import { Sequelize, Op, where } from "sequelize";
import db from "../models";

export async function getProducts(req, res) {
  const { search = "", page = 1 } = req.query;
  const pageSize = 5;
  const offset = (page - 1) * pageSize;

  let whereClause = {};
  if (search.trim() !== "") {
    whereClause = {
      [Op.or]: {
        name: { [Op.like]: `%${search}` },
        description: { [Op.like]: `%${search}%` },
        specification: { [Op.like]: `%${search}%` },
      },
    };
  }

  const [products, totalProducts] = await Promise.all([
    db.Product.findAll({
      where: whereClause,
      limit: pageSize,
      offset: offset,
    }),
    db.Product.count({
      where: whereClause,
    }),
  ]);

  return res.status(200).json({
    message: "Success",
    data: products,
    current_pages: parseInt(page, 10),
    total_pages: Math.ceil(totalProducts / pageSize),
    total_products: totalProducts,
  });
}

export async function getProductById(req, res) {
  const { id } = req.params;
  const product = await db.Product.findByPk(id, {
    include: [{ model: db.ProductImage, as: "product_image" }],
  });
  if (!product) {
    return res.status(404).json({
      message: "Product not found",
    });
  }
  return res.status(200).json({
    message: "Success",
    data: product,
  });
}

export async function insertProduct(req, res) {
  const { name } = req.body;
  const existingProduct = await db.Product.findOne({ where: { name } });
  if (existingProduct) {
    return res.status(409).json({
      message: "Product name already exists",
    });
  }

  const product = await db.Product.create(req.body);
  res.status(201).json({
    message: "Insert product successfully",
    data: product,
  });
}

export async function updateProduct(req, res) {
  const { id } = req.params;
  const updateProduct = await db.Product.update(req.body, {
    where: { id },
  });
  if (updateProduct[0] > 0) {
    return res.status(200).json({
      message: "Update product successfully",
    });
  } else {
    return res.status(404).json({
      message: "Product not found",
    });
  }
}

export async function deleteProduct(req, res) {
  const { id } = req.params;
  const deleted = await db.Product.destroy({
    where: { id },
  });
  if (!deleted) {
    return res.status(404).json({
      message: "Product not found",
    });
  } else {
    return res.status(200).json({
      message: "Delete product successfully",
    });
  }
}
