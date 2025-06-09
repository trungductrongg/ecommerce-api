"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Users.hasMany(models.Oder, {
        foreignKey: "user_id",
        as: "orders",
      });
      Users.hasMany(models.Feedback, {
        foreignKey: "user_id",
        as: "feedbacks",
      });
    }
  }
  Users.init(
    {
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      role: DataTypes.INTEGER,
      phone: DataTypes.INTEGER,
      created_at: DataTypes.DATE,
      updated_at: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Users",
      tableName: "users",
      underscored: true,
    }
  );
  return Users;
};
