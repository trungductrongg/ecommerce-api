import express from "express";
import productRoutes from "./routes/product.routes.js";
import categoryRoutes from "./routes/category.routes.js";
import brandRoutes from "./routes/brand.routes.js";
import orderRoutes from "./routes/order.routes.js";
import orderDetailRoutes from "./routes/orderdetail.routes.js";
import userRoutes from "./routes/user.routes.js";

export function AppRoute(app) {
  const baseUrl = process.env.URL || "/api";

  app.use(`${baseUrl}/products`, productRoutes);
  app.use(`${baseUrl}/categories`, categoryRoutes);
  app.use(`${baseUrl}/brands`, brandRoutes);
  app.use(`${baseUrl}/orders`, orderRoutes);
  app.use(`${baseUrl}/orderdetails`, orderDetailRoutes);
  app.use(`${baseUrl}/users`, userRoutes);
}
