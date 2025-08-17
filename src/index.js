/*

select * from information_schema.table_constraints where table_schema = 'shopapp' and table_name = 'products';
npx sequelize-cli init
npx sequelize-cli model:generate --name User --attributes email:string,password:string,role:integer,avatar:text,phone:integer,created_at:date,updated_at:date
npx sequelize-cli model:generate --name Category --attributes name:string,image:text
npx sequelize-cli model:generate --name Brand --attributes name:string,image:text
npx sequelize-cli model:generate --name News --attributes title:string,image:text,content:text
npx sequelize-cli model:generate --name Banner --attributes name:string,image:text,status:integer
npx sequelize-cli model:generate --name Oder --attributes user_id:integer,status:integer,note:text,total:integer
npx sequelize-cli model:generate --name Product --attributes name:string,price:integer,oldprice:integer,image:text,description:text,specification:text,buyturn:integer,quantity:integer,brand_id:integer,category_id:integer
npx sequelize-cli model:generate --name OderDetail --attributes oder_id:integer,product_id:integer,price:integer,quantity:integer
npx sequelize-cli model:generate --name BannerDetail --attributes product_id:integer,banner_id:integer
npx sequelize-cli model:generate --name Feedback --attributes product_id:integer,user_id:integer,star:integer,comment:text
npx sequelize-cli model:generate --name NewsDetail2 --attributes product_id:integer,news_id:integer
npx sequelize-cli model:generate --name ProductImage --attributes product_id:integer,image:text
npx sequelize-cli migration:generate --name add_session_to_orders
npx sequelize-cli model:generate --name Cart --attributes session_id:string,user_id:integer
npx sequelize-cli model:generate --name CartItem --attributes cart_id:integer,product_id:integer,quantity:integer

Run Migration
npx sequelize-cli db:migrate
npx sequelize-cli db:migrate --config src/config/config.js

Reverse Migration
npx sequelize-cli db:migrate:undo

yarn add sql2
yarn add express
yarn add dotenv nodemon
yarn add --dev @babel/core @babel/node @babel/preset-env
./node_modules/.bin/babelmode --version




*/

import express from "express";
import dotenv from "dotenv";
import db from "./models";
const os = require("os");
// const express = require("express");
dotenv.config();

const app = express();
app.use(express.json());
express.urlencoded({ extended: true });
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );

  next();
});

import { AppRoute } from "./AppRoute";

app.get("/", (req, res) => {
  // http://localhost:3000/products
  res.send("Hello World!!!!");
});

app.get("/api/healthcheck", async (req, res) => {
  try {
    await db.sequelize.authenticate();

    const cpuLoad = os.loadavg();
    const cpus = os.cpus();
    const cpuPercentage = (cpuLoad[0] / cpus.length) * 100;

    const memoryUsage = process.memoryUsage();
    const toMB = (bytes) => (bytes / 1024 / 1024).toFixed(2) + " MB";

    res.status(200).json({
      status: "OK",
      database: "Connected",
      cpuLoad: {
        "1min": cpuLoad[0].toFixed(2),
        "5min": cpuLoad[1].toFixed(2),
        "15min": cpuLoad[2].toFixed(2),
        percentage: cpuPercentage.toFixed(2) + "%",
      },
      memoryUsage: {
        rss: toMB(memoryUsage.rss),
        heapTotal: toMB(memoryUsage.heapTotal),
        heapUsed: toMB(memoryUsage.heapUsed),
        external: toMB(memoryUsage.external),
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "Failed",
      message: "Health check failed",
      error: error.message,
    });
  }
});

const port = process?.env?.PORT ?? 3000;

AppRoute(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
