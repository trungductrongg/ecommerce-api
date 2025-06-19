import { Sequelize, Op, where } from "sequelize";
import db from "../models";

export async function getOrders(req, res) {
  res.status(200).json({
    message: "Get orders successfully",
  });
}

export async function getOrderById(req, res) {
  res.status(200).json({
    message: "Get order successfully",
  });
}

export async function insertOrder(req, res) {
  const { user_id } = req.body;
  const user = await db.User.findByPk(user_id);
  if (!user) {
    return res.status(404).json({
      message: "User Not Found",
    });
  }
  const order = await db.Order.create(req.body);
  if (order) {
    return res.status(201).json({
      message: "Insert order successfully",
      data: order,
    });
  } else {
    return res.status(400).json({
      message: "Insert order Error",
    });
  }
}

export async function updateOrder(req, res) {
  res.status(200).json({
    message: "Update order successfully",
  });
}

export async function deleteOrder(req, res) {
  const { id } = req.params;
  const deleted = await db.Order.destroy({ where: id });
  if (!deleted) {
    return res.status(200).json({
      message: "Delete order successfully",
    });
  } else {
    res.status(404).json({
      message: "Order not found",
    });
  }
}
