import { Sequelize } from "sequelize";
import db from "../models";

export async function getBrands(req, res) {
  res.status(200).json({
    message: "Get brands successfully",
  });
}

export async function getBrandById(req, res) {
  res.status(200).json({
    message: "Get brand successfully",
  });
}

export async function insertBrand(req, res) {
  try {
    const brand = await db.Brand.create(req.body);
    res.status(201).json({
      message: "Insert brand successfully",
      data: brand,
    });
  } catch (error) {
    res.status(500).json({
      message: "Insert brand failed",
      error: error.message,
    });
  }
}

export async function updateBrand(req, res) {
  res.status(200).json({
    message: "Update brand successfully",
  });
}

export async function deleteBrand(req, res) {
  res.status(200).json({
    message: "Delete brand successfully",
  });
}
