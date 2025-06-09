"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.belongsTo(models.Category, {
        foreignKey: "category_id",
        as: "category",
      });

      Product.belongsTo(models.Brand, {
        foreignKey: "brand_id",
        as: "brand",
      });

      Product.hasMany(models.BannerDetail, {
        foreignKey: "product_id",
        as: "banner_details",
      });

      Product.hasMany(models.OrderDetail, {
        foreignKey: "product_id",
        as: "order_details",
      });

      Product.hasMany(models.Feedback, {
        foreignKey: "product_id",
        as: "feedbacks",
      });
      Product.hasMany(models.NewsDetail, {
        foreignKey: "product_id",
        as: "news_details",
      });
    }
  }
  Product.init(
    {
      name: DataTypes.STRING,
      price: DataTypes.INTEGER,
      oldprice: DataTypes.INTEGER,
      image: DataTypes.TEXT,
      description: DataTypes.TEXT,
      specification: DataTypes.TEXT,
      buyturn: DataTypes.INTEGER,
      quantity: DataTypes.INTEGER,
      brand_id: DataTypes.INTEGER,
      category_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Product",
      tableName: "products",
      underscored: true,
    }
  );
  return Product;
};
