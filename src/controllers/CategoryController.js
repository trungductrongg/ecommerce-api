import { Sequelize } from "sequelize";
import db from "../models";

export async function getCategories(req, res) {
  res.status(200).json({
    message: "Get categories successfully",
  });
}

export async function getCategoryById(req, res) {
  res.status(200).json({
    message: "Get category successfully",
  });
}

export async function insertCategory(req, res) {
  try {
    const category = await db.Category.create(req.body);
    res.status(201).json({
      message: "Insert category successfully",
      data: category,
    });
  } catch (error) {
    res.status(500).json({
      message: "Insert category failed",
      error: error.message,
    });
  }
}

export async function updateCategory(req, res) {
  res.status(200).json({
    message: "Update category successfully",
  });
}

export async function deleteCategory(req, res) {
  res.status(200).json({
    message: "Delete category successfully",
  });
}
