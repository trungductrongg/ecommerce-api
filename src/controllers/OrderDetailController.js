import { Sequelize, where } from "sequelize";
import db from "../models";

export async function getOrderDetails(req, res) {
  const orderDetail = await db.OrderDetail.findAll();
  return res.status(200).json({
    message: "Get order details successfully",
    data: orderDetail,
  });
}

export async function getOrderDetailById(req, res) {
  const { id } = req.params;
  const orderDetail = await db.OrderDetail.findByPk(id);
  if (!orderDetail) {
    return res.status(404).json({
      message: "Order detail not found",
    });
  }
  return res.status(200).json({
    message: "Get order detail successfully",
    data: orderDetail,
  });
}

export async function insertOrderDetail(req, res) {
  const orderDetail = await db.OrderDetail.create(req.body);
  return res.status(201).json({
    message: "Insert order detail successfully",
    data: orderDetail,
  });
}

export async function updateOrderDetail(req, res) {
  const { id } = req.params;
  const orderDetail = await db.OrderDetail.update(req.body, { where: { id } });
  if (orderDetail[0] > 0) {
    return res.status(200).json({
      message: "Update Order Detail Successfully",
    });
  } else {
    res.status(404).json({
      message: "Order Detail Not Found",
    });
  }
}

export async function deleteOrderDetail(req, res) {
  const { id } = req.params;
  const deleted = await db.OrderDetail.destroy({ where: id });
  if (deleted) {
    res.status(200).json({
      message: "Delete order detail successfully",
    });
  } else {
    res.status(200).json({
      message: "Order Detail Not Found",
    });
  }
}
