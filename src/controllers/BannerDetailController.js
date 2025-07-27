import { Op, where } from "sequelize";
import db from "../models";
import e from "express";

export async function getBannerDetails(req, res) {
  const { search = "", page = 1 } = req.query;
  const pageSize = 5;
  const offset = (page - 1) * pageSize;

  let whereClause = {};
  if (search.trim() !== "") {
    const keyword = Number(search);
    if (!isNaN(keyword)) {
      whereClause = {
        [Op.or]: [{ product_id: keyword }, { banner_id: keyword }],
      };
    }
  }

  const [bannerDetails, total] = await Promise.all([
    db.BannerDetail.findAll({
      where: whereClause,
      limit: pageSize,
      offset,
    }),
    db.BannerDetail.count({
      where: whereClause,
    }),
  ]);

  return res.status(200).json({
    message: "Get Banner Details Successfully",
    data: bannerDetails,
    current_page: parseInt(page, 10),
    total_pages: Math.ceil(total / pageSize),
    total_banner_details: total,
  });
}

// GET /bannerdetails/:id
export async function getBannerDetailById(req, res) {
  const { id } = req.params;
  const bannerDetail = await db.BannerDetail.findByPk(id);
  if (!bannerDetail) {
    return res.status(404).json({
      message: "Banner Detail Not Found",
    });
  }

  return res.status(200).json({
    message: "Get Banner Detail Successfully",
    data: bannerDetail,
  });
}

// POST /bannerdetails
export async function insertBannerDetail(req, res) {
  const { product_id, banner_id } = req.body;

  const product = await db.Product.findByPk(product_id);
  if (!product) {
    return res.status(400).json({
      message: "Insert Banner Detail Failed",
      error: `Product with id ${product_id} does not exist`,
    });
  }

  const banner = await db.Banner.findByPk(banner_id);
  if (!banner) {
    return res.status(400).json({
      message: "Insert Banner Detail Failed",
      error: `Banner with id ${banner_id} does not exist`,
    });
  }

  const exists = await db.BannerDetail.findOne({
    where: { product_id, banner_id },
  });

  if (exists) {
    return res.status(400).json({
      message: "Insert Banner Detail Failed",
      error: "This product has already been added to the banner",
    });
  }

  // 4. Thêm mới
  const bannerDetail = await db.BannerDetail.create({ product_id, banner_id });
  return res.status(201).json({
    message: "Insert Banner Detail Successfully",
    data: bannerDetail,
  });
}

// PUT /bannerdetails/:id
export async function updateBannerDetail(req, res) {
  const { id } = req.params;
  const { product_id, banner_id } = req.body;
  const existigBannnerDetail = await db.BannerDetail.findOne({
    where: {
      product_id,
      banner_id,
      id: { [db.Sequelize.Op.ne]: id },
    },
  });

  if (existigBannnerDetail) {
    return res.status(409).json({ message: "Banner Detail already exist" });
  }

  const [updated] = await db.BannerDetail.update(
    {
      product_id,
      banner_id,
    },
    { where: { id } }
  );

  if (updated) {
    return res.status(200).json({
      message: "Update Banner Detail Success",
    });
  } else {
    return res.status(404).json({
      message: "Update Banner Detail Failed",
    });
  }
}

// DELETE /bannerdetails/:id
export async function deleteBannerDetail(req, res) {
  const { id } = req.params;
  const deleted = await db.BannerDetail.destroy({
    where: { id },
  });

  if (!deleted) {
    return res.status(404).json({
      message: "Banner Detail Not Found",
    });
  }

  return res.status(200).json({
    message: "Delete Banner Detail Successfully",
  });
}
