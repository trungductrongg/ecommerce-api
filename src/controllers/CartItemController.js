import { Op } from "sequelize";
import db from "../models";

export async function getCartItems(req, res) {
  const { search = "", page = 1 } = req.query;
  const pageSize = 5;
  const offset = (page - 1) * pageSize;

  let whereClause = {};

  if (search.trim() !== "") {
    whereClause = {
      [Op.or]: {
        product_id: { [Op.like]: `%${search}%` },
        cart_id: { [Op.like]: `%${search}%` },
      },
    };
  }

  const [cartItems, totalCartItems] = await Promise.all([
    db.CartItem.findAll({
      where: whereClause,
      limit: pageSize,
      offset: offset,
      include: [
        { model: db.Cart, as: "cart" },
        { model: db.Product, as: "product" },
      ],
    }),
    db.CartItem.count({ where: whereClause }),
  ]);

  return res.status(200).json({
    message: "Get cart items successfully",
    data: cartItems,
    current_page: parseInt(page, 10),
    total_pages: Math.ceil(totalCartItems / pageSize),
    total_cart_items: totalCartItems,
  });
}

export async function getCartItemById(req, res) {
  const { id } = req.params;
  const cartItem = await db.CartItem.findByPk(id, {
    include: [
      { model: db.Cart, as: "cart" },
      { model: db.Product, as: "product" },
    ],
  });

  if (!cartItem) {
    return res.status(404).json({ message: "Cart item not found" });
  }

  return res.status(200).json({
    message: "Get cart item successfully",
    data: cartItem,
  });
}

export async function insertCartItem(req, res) {
  const { cart_id, product_id } = req.body;

  const existingItem = await db.CartItem.findOne({
    where: { cart_id, product_id },
  });

  if (existingItem) {
    return res.status(409).json({ message: "Product already exists in cart" });
  }

  const cartItem = await db.CartItem.create(req.body);

  return res.status(201).json({
    message: "Insert cart item successfully",
    data: cartItem,
  });
}

export async function updateCartItem(req, res) {
  const { id } = req.params;

  const updateCartItem = await db.CartItem.update(req.body, {
    where: { id },
  });

  if (updateCartItem[0] > 0) {
    return res.status(200).json({ message: "Update cart item successfully" });
  } else {
    return res.status(404).json({ message: "Cart item not found" });
  }
}

export async function deleteCartItem(req, res) {
  const { id } = req.params;

  const deleted = await db.CartItem.destroy({
    where: { id },
  });

  if (!deleted) {
    return res.status(404).json({ message: "Cart item not found" });
  } else {
    return res.status(200).json({ message: "Delete cart item successfully" });
  }
}
