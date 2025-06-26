import { Op, Sequelize, where } from "sequelize";
import db from "../models";

export async function getNewsArticcles(req, res) {
  const { search = "", page = 1 } = req.query;
  const pageSize = 5;
  const offset = (page - 1) * pageSize;

  let whereClause = {};
  if (search.trim() !== "") {
    whereClause = {
      [Op.or]: [
        { title: { [Op.like]: `%${search}%` } },
        { content: { [Op.like]: `%${search}%` } },
      ],
    };
  }

  const [newsArticles, totalNews] = await Promise.all([
    db.News.findAll({
      where: whereClause,
      limit: pageSize,
      offset: offset,
    }),
    db.News.count({
      where: whereClause,
    }),
  ]);

  return res.status(200).json({
    message: "Success",
    data: newsArticles,
    current_pages: Math.ceil(totalNews / pageSize),
    total_news: totalNews,
  });
}

export async function getNewsById(req, res) {
  const { id } = req.params;
  const news = await db.News.findByPk(id);
  if (!news) {
    return res.status(404).json({
      message: "News Not Found",
    });
  }
  return res.status(200).json({
    message: "Get News Successfully",
    data: news,
  });
}

export async function insertNews(req, res) {
  const transaction = await db.sequelize.transaction();

  try {
    const newsArticles = await db.News.create(req.body, { transaction });
    const productIds = req.body.product_ids;
    if (productIds && productIds.length) {
      const validProducts = await db.Product.findAll({
        where: { id: productIds },
        transaction,
      });
      const validProductIds = validProducts.map((product) => product.id);
      const filteredProductIds = productIds.filter((id) =>
        validProductIds.includes(id)
      );
      const newsDetailPromises = filteredProductIds.map((product_id) =>
        db.NewsDetail.create(
          {
            product_id: product_id,
            news_id: newsArticles.id,
          },
          { transaction }
        )
      );
      await Promise.all(newsDetailPromises);
    }
    await transaction.commit();
    return res.status(200).json({
      message: "Insert News Successfully",
      data: newsArticles,
    });
  } catch (error) {
    await transaction.rollback();
    res.status(500).json({
      message: "",
      error: error.message,
    });
  }
}

export async function updateNewsArticle(req, res) {
  const { id } = req.params;
  const updated = await db.News.update(req.body, { where: { id } });
  if (updated[0] > 0) {
    return res.status(200).json({
      message: "Update News Successfully",
    });
  } else {
    return res.status(404).json({
      message: "News Not Found",
    });
  }
}

export async function deleteNewsArticle(req, res) {
  const { id } = req.params;
  const transaction = await db.sequelize.transaction();

  try {
    await db.NewsDetail.destroy({
      where: { news_id: id },
      transaction: transaction,
    });

    const deleted = await db.News.destroy({
      where: { id },
      transaction: transaction,
    });

    if (deleted) {
      await transaction.commit();
      return res.status(200).json({
        message: "Delete News Successfully",
      });
    } else {
      await transaction.rollback();
      return res.status(404).json({
        message: "News Not Found",
      });
    }
  } catch (error) {
    await transaction.rollback();
    return res.status(500).json({
      message: "Error when delete News",
      error: error.message,
    });
  }
}
