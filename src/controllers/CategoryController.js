import { Op, Sequelize, where } from "sequelize";
import db from "../models";

export async function getCategories(req, res) {
  const { search = "", page = 1 } = req.query;
  const pageSize = 5;
  const offset = (page - 1) * pageSize;

  let whereClause = {};
  if (search.trim() !== "") {
    whereClause = {
      [Op.or]: {
        name: { [Op.like]: `%${search}%` },
      },
    };
  }
  const [categories, totalCategories] = await Promise.all([
    db.Category.findAll({
      where: whereClause,
      limit: pageSize,
      offset: offset,
    }),
    db.Category.count({
      where: whereClause,
    }),
  ]);

  return res.status(200).json({
    message: "Get category success",
    data: categories,
    current_page: parseInt(page, 10),
    total_pages: Math.ceil(totalCategories / pageSize),
    total_categories: totalCategories,
  });
}

export async function getCategoryById(req, res) {
  const { id } = req.params;
  const category = await db.Category.findByPk(id);
  if (!category) {
    return res.status(404).json({
      message: "Category not found",
    });
  }
  return res.status(200).json({
    message: "Get category successfully",
    data: category,
  });
}

export async function insertCategory(req, res) {
  const category = await db.Category.create(req.body);
  return res.status(201).json({
    message: "Insert category successfully",
    data: category,
  });
}

export async function updateCategory(req, res) {
  const { id } = req.params;
  const updateCategory = await db.Category.update(req.body, {
    where: { id },
  });
  if (updateCategory[0] > 0) {
    return res.status(200).json({
      message: "Update category successfully",
    });
  } else {
    return res.status(404).json({
      message: "Category not found",
    });
  }
}

export async function deleteCategory(req, res) {
  const { id } = req.params;
  const deleted = await db.Category.destroy({
    where: { id },
  });
  if (!deleted) {
    return res.status(404).json({
      message: "Category not found",
    });
  } else {
    return res.status(200).json({
      message: "Delete category successfully",
    });
  }
}
