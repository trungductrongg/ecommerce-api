import { Op } from "sequelize";
import db, { Sequelize } from "../models";
import path from "path";
import fs from "fs";

export async function getBanners(req, res) {
  const { search = "", page = 1 } = req.query;
  const pageSize = 5;
  const offset = (page - 1) * pageSize;

  let whereClause = {};
  if (search.trim() !== "") {
    whereClause = {
      [Op.or]: [
        { name: { [Op.like]: `%${search}%` } },
        { status: isNaN(search) ? -1 : Number(search) },
      ],
    };
  }

  const [banners, totalBanners] = await Promise.all([
    db.Banner.findAll({
      where: whereClause,
      limit: pageSize,
      offset: offset,
    }),
    db.Banner.count({ where: whereClause }),
  ]);

  return res.status(200).json({
    message: "Get Banners Successfully",
    data: banners,
    current_page: parseInt(page, 10),
    total_pages: Math.ceil(totalBanners / pageSize),
    total_banners: totalBanners,
  });
}

// GET /banners/:id
export async function getBannerById(req, res) {
  const { id } = req.params;
  const banner = await db.Banner.findByPk(id);

  if (!banner) {
    return res.status(404).json({ message: "Banner Not Found" });
  }

  return res.status(200).json({
    message: "Get Banner Successfully",
    data: banner,
  });
}

// POST /banners
export async function insertBanner(req, res) {
  const { name } = req.body;

  // Kiểm tra trùng tên banner
  const existing = await db.Banner.findOne({ where: { name: name.trim() } });
  if (existing) {
    return res.status(409).json({
      message: "Insert Banner Failed",
      error: "Banner with the same name already exists",
    });
  }

  // Tạo mới
  const banner = await db.Banner.create(req.body);
  return res.status(201).json({
    message: "Insert Banner Successfully",
    data: banner,
  });
}

// PUT /banners/:id
export async function updateBanner(req, res) {
  const { id } = req.params;

  const existingBanner = await db.Banner.findOne({
    where: { name: req.body.name, id: { [Sequelize.Op.ne]: id } },
  });

  if (existingBanner) {
    return res.status(409).json({
      message: "Banner Name already exist",
    });
  }

  const updated = await db.Banner.update(req.body, { where: { id } });

  if (updated[0] > 0) {
    return res.status(200).json({
      message: "Update Banner Successfully",
    });
  } else {
    return res.status(404).json({
      message: "Banner Not Found",
    });
  }
}

// DELETE /banners/:id
export async function deleteBanner(req, res) {
  const { id } = req.params;
  const deleted = await db.Banner.destroy({ where: { id } });

  if (!deleted) {
    return res.status(404).json({ message: "Banner Not Found" });
  }

  return res.status(200).json({
    message: "Delete Banner Successfully",
  });
}
