"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Feedback extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Feedback.belongsTo(models.Product, {
        foreignKey: "product_id",
        as: "product",
      });

      Feedback.belongsTo(models.Users, {
        foreignKey: "user_id",
        as: "user",
      });
    }
  }
  Feedback.init(
    {
      product_id: DataTypes.INTEGER,
      user_id: DataTypes.INTEGER,
      star: DataTypes.INTEGER,
      comment: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "Feedback",
      tableName: "feedbacks",
      underscored: true,
    }
  );
  return Feedback;
};
