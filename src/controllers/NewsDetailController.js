import { Op, where } from "sequelize";
import db, { Sequelize } from "../models";

export async function getNewsDetails(req, res) {
  const { page = 1 } = req.query;
  const pageSize = 5;
  const offset = (page - 1) * pageSize;

  const [newsDetails, totalNewsDetails] = await Promise.all([
    db.NewsDetail.findAll({
      limit: pageSize,
      offset: offset,
      // include: [
      //   { model: db.News, as: "news" },
      //   { model: db.Product, as: "products" },
      // ],
    }),
    db.NewsDetail.count(),
  ]);

  return res.status(200).json({
    message: "Get news detail success",
    data: newsDetails,
    current_page: parseInt(page, 10),
    total_pages: Math.ceil(totalNewsDetails / pageSize),
    total_news_details: totalNewsDetails,
  });
}

export async function getNewsDetailById(req, res) {
  const { id } = req.params;
  const newsDetail = await db.NewsDetail.findByPk(id, {
    include: [
      { model: db.News, as: "news" },
      { model: db.Product, as: "products" },
    ],
  });
  if (!newsDetail) {
    return res.status(404).json({
      message: "News detail not found",
    });
  }
  return res.status(200).json({
    message: "Get news detail successfully",
    data: newsDetail,
  });
}

export async function insertNewsDetail(req, res) {
  const { product_id, news_id } = req.body;
  const productExists = await db.Product.findByPk(product_id);
  if (!productExists) {
    return res.status(404).json({
      message: "Product does not exists",
    });
  }

  const newsExists = await db.News.findByPk(news_id);
  if (!newsExists) {
    return res.status(404).json({
      message: "News does not exists",
    });
  }

  const duplicateExists = await db.NewsDetail.findOne({
    where: { news_id, product_id },
  });
  if (duplicateExists) {
    return res.status(409).json({
      message: "News and product alredy exist",
    });
  }
  const newsDetail = await db.NewsDetail.create({ product_id, news_id });
  return res.status(201).json({
    message: "Insert news detail successfully",
    data: newsDetail,
  });
}

export async function updateNewsDetail(req, res) {
  const { id } = req.params;
  const { product_id, news_id } = req.body;
  const existingDuplicate = await db.NewsDetail.findOne({
    where: {
      product_id,
      news_id,
      id: { [Sequelize.Op.ne]: id },
    },
  });

  if (existingDuplicate) {
    return res.status(409).json({
      message: "News Detail already exist",
    });
  }

  const updatedNewDetail = await db.NewsDetail.update(
    {
      product_id,
      news_id,
    },
    { where: { id } }
  );

  if (updatedNewDetail[0] > 0) {
    return res.status(200).json({
      message: "Update News Detail Success",
    });
  } else {
    return res.status(404).json({
      message: "News Detail Not Found",
    });
  }
}

export async function deleteNewsDetail(req, res) {
  const { id } = req.params;
  const deleted = await db.NewsDetail.destroy({
    where: { id },
  });
  if (!deleted) {
    return res.status(404).json({
      message: "News detail not found",
    });
  } else {
    return res.status(200).json({
      message: "Delete news detail successfully",
    });
  }
}
