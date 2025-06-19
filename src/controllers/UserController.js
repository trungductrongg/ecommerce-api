import { Sequelize, Op, where } from "sequelize";
import db from "../models";
import insertUserRequest from "../dtos/requests/user/inserUserRequest";
import ResponseUser from "../dtos/responses/user/ResponseUser";

export async function getUsers(req, res) {
  const { search = "", page = 1 } = req.query;
  const pageSize = 5;
  const offset = (page - 1) * pageSize;

  let whereClause = {};
  if (search.trim() !== "") {
    whereClause = {
      [Op.or]: {
        name: { [Op.like]: `%${search}` },
        description: { [Op.like]: `%${search}%` },
        specification: { [Op.like]: `%${search}%` },
      },
    };
  }

  const [products, totalProducts] = await Promise.all([
    db.User.findAll({
      where: whereClause,
      limit: pageSize,
      offset: offset,
    }),
    db.User.count({
      where: whereClause,
    }),
  ]);

  res.status(200).json({
    message: "Success",
    data: products,
    current_pages: parseInt(page, 10),
    total_pages: Math.ceil(totalProducts / pageSize),
    total_products: totalProducts,
  });
}

export async function getUserById(req, res) {
  const { id } = req.params;
  const product = await db.Product.findByPk(id);
  if (!product) {
    return res.status(404).json({
      message: "Product not found",
    });
  }
  return res.status(200).json({
    message: "Success",
    data: product,
  });
}

export async function insertUser(req, res) {
  const existingUser = await db.User.findOne({
    where: { email: req.body.email },
  });
  if (existingUser) {
    return res.status(409).json({
      message: "Email already exists",
    });
  }

  const user = await db.User.create(new insertUserRequest(req.body));
  if (user) {
    return res.status(201).json({
      message: "Insert User Successfully",
      data: new ResponseUser(user),
    });
  } else {
    res.status(400).json({
      message: "Insert User Error",
    });
  }
}

export async function updateUser(req, res) {
  const { id } = req.params;
  const [updated] = await db.User.update(req.body, {
    where: { id },
  });
  if (updated) {
    return res.status(200).json({
      message: "Update User Successfully",
    });
  } else {
    return res.status(404).json({
      message: "User not found",
    });
  }
}

export async function deleteUser(req, res) {
  const { id } = req.params;
  const deleted = await db.User.destroy({
    where: { id },
  });
  if (!deleted) {
    return res.status(404).json({
      message: "User not found",
    });
  } else {
    return res.status(200).json({
      message: "Delete user successfully",
    });
  }
}
