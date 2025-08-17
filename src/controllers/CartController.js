import { Op } from "sequelize";
import db from "../models";

export async function getCarts(req, res) {
  const { search = "", page = 1 } = req.query;
  const pageSize = 5;
  const offset = (page - 1) * pageSize;

  let whereClause = {};
  if (search.trim() !== "") {
    whereClause = {
      [Op.or]: [
        { session_id: { [Op.like]: `%${search}%` } },
        { user_id: { [Op.like]: `%${search}%` } },
      ],
    };
  }

  const [carts, totalCarts] = await Promise.all([
    db.Cart.findAll({
      where: whereClause,
      limit: pageSize,
      offset: offset,
    }),
    db.Cart.count({ where: whereClause }),
  ]);

  return res.status(200).json({
    message: "Get carts successfully",
    data: carts,
    current_page: parseInt(page, 10),
    total_pages: Math.ceil(totalCarts / pageSize),
    total_carts: totalCarts,
  });
}

export async function getCartById(req, res) {
  const { id } = req.params;
  const cart = await db.Cart.findByPk(id, {
    include: [
      {
        model: db.CartItem,
        as: "cart_items",
      },
    ],
  });
  if (!cart) {
    return res.status(404).json({ message: "Cart not found" });
  }
  return res.status(200).json({
    message: "Get cart successfully",
    data: cart,
  });
}

export async function insertCart(req, res) {
  const { session_id, user_id } = req.body;

  const existingCart = await db.Cart.findOne({
    where: { session_id, user_id },
  });

  if (existingCart) {
    return res
      .status(409)
      .json({ message: "Cart already exists for this user/session" });
  }

  const cart = await db.Cart.create(req.body);
  return res.status(201).json({
    message: "Insert cart successfully",
    data: cart,
  });
}

// export async function updateCart(req, res) {
//   const { id } = req.params;

//   const updateCart = await db.Cart.update(req.body, {
//     where: { id },
//   });

//   if (updateCart[0] > 0) {
//     return res.status(200).json({ message: "Update cart successfully" });
//   } else {
//     return res.status(404).json({ message: "Cart not found" });
//   }
// }

export async function deleteCart(req, res) {
  const { id } = req.params;

  const deleted = await db.Cart.destroy({
    where: { id },
  });

  if (!deleted) {
    return res.status(404).json({ message: "Cart not found" });
  } else {
    return res.status(200).json({ message: "Delete cart successfully" });
  }
}
