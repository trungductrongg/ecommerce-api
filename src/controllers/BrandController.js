import { Op, Sequelize } from "sequelize";
import db from "../models";

export async function getBrands(req, res) {
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
  const [brands, totalBrands] = await Promise.all([
    db.Brand.findAll({
      where: whereClause,
      limit: pageSize,
      offset: offset,
    }),
    db.Brand.count({
      where: whereClause,
    }),
  ]);
  return res.status(200).json({
    message: "Get brands success",
    data: brands,
    current_page: parseInt(page, 10),
    total_pages: Math.ceil(totalBrands / pageSize),
    total_categories: totalBrands,
  });
}

export async function getBrandById(req, res) {
  const { id } = req.params;
  const brand = await db.Brand.findByPk(id);
  if (!brand) {
    return res.status(404).json({
      message: "brand not found",
    });
  }
  return res.status(200).json({
    message: "Get brand successfully",
    data: brand,
  });
}

export async function insertBrand(req, res) {
  const { name } = req.body;
  const existing = await db.Brand.findOne({ where: { name: name.trim() } });
  if (existing) {
    return res.status(409).json({
      message: "Insert Brand Failed",
      error: "Brand with the same name already exists",
    });
  }

  const brand = await db.Brand.create(req.body);
  res.status(201).json({
    message: "Insert brand successfully",
    data: brand,
  });
}

export async function updateBrand(req, res) {
  const { id } = req.params;
  const { name } = req.body;
  if (name !== undefined) {
    const existing = await db.Brand.findOne({ where: { name: name.trim() } });
    if (existing) {
      return res.status(409).json({
        message: "Insert Brand Failed",
        error: "Brand with the same name already exists",
      });
    }
  }
  const updateBrand = await db.Brand.update(req.body, {
    where: { id },
  });
  if (updateBrand[0] > 0) {
    return res.status(200).json({
      message: "Update brand successfully",
    });
  } else {
    return res.status(404).json({
      message: "Brand not found",
    });
  }
}

export async function deleteBrand(req, res) {
  const { id } = req.params;
  const deleted = await db.Brand.destroy({ where: { id } });
  if (deleted) {
    return res.status(200).json({
      message: "Delete brand successfully",
    });
  } else {
    res.status(404).json({
      message: "Brand not found",
    });
  }
}
