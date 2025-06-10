import { Sequelize } from "sequelize";
import db from "../models";
import InsertProductRequest from "../dtos/requests/InsertProductRequest";

export async function getProducts(req, res) {
  res.status(200).json({
    message: "Get product successfully",
  });
}

export async function getProductById(req, res) {
  res.status(200).json({
    message: "Get product successfully",
  });
}

export async function insertProduct(req, res) {
  const { error } = InsertProductRequest.validate(req.body);
  if (error) {
    return res.status(400).json({
      message: "Insert product failed",
      error: error.details[0]?.message,
    });
  }
  const product = await db.Product.create(req.body);
  res.status(201).json({
    message: "Insert product successfully",
    data: product,
  });
}

export async function updateProduct(req, res) {
  res.status(200).json({
    message: "Insert successfully",
  });
}

export async function deleteProduct(req, res) {
  res.status(200).json({
    message: "Insert successfully",
  });
}
