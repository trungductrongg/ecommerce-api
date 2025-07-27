import productRoutes from "./routes/product.routes.js";
import categoryRoutes from "./routes/category.routes.js";
import brandRoutes from "./routes/brand.routes.js";
import orderRoutes from "./routes/order.routes.js";
import orderDetailRoutes from "./routes/orderdetail.routes.js";
import userRoutes from "./routes/user.routes.js";
import newsRoutes from "./routes/news.routes.js";
import newsDetailRoutes from "./routes/newsdetails.routes.js";
import bannerDetailRoutes from "./routes/bannerdetail.routes.js";
import bannerRoutes from "./routes/banner.routes.js";
import imagesRoutes from "./routes/image.routes.js";
import productImageRoutes from "./routes/productimages.routes.js";

export function AppRoute(app) {
  const baseUrl = process.env.URL || "/api";

  app.use(`${baseUrl}/products`, productRoutes);
  app.use(`${baseUrl}/categories`, categoryRoutes);
  app.use(`${baseUrl}/brands`, brandRoutes);
  app.use(`${baseUrl}/orders`, orderRoutes);
  app.use(`${baseUrl}/orderdetails`, orderDetailRoutes);
  app.use(`${baseUrl}/users`, userRoutes);
  app.use(`${baseUrl}/news`, newsRoutes);
  app.use(`${baseUrl}/news-details`, newsDetailRoutes);
  app.use(`${baseUrl}/banner`, bannerRoutes);
  app.use(`${baseUrl}/banner-details`, bannerDetailRoutes);
  app.use(`${baseUrl}/images`, imagesRoutes);
  app.use(`${baseUrl}/product-images`, productImageRoutes);
}
