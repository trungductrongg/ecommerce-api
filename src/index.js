/*

select * from information_schema.table_constraints where table_schema = 'shopapp' and table_name = 'orders';
npx sequelize-cli init
npx sequelize-cli model:generate --name users --attributes email:string,password:string,role:integer,phone:integer,created_at:date,updated_at:date
npx sequelize-cli model:generate --name category --attributes name:string,image:text
npx sequelize-cli model:generate --name Brand --attributes name:string,image:text
npx sequelize-cli model:generate --name News --attributes title:string,image:text,content:text
npx sequelize-cli model:generate --name Banner --attributes name:string,image:text,status:integer
npx sequelize-cli model:generate --name Oder --attributes user_id:integer,status:integer,note:text,total:integer
npx sequelize-cli model:generate --name Product --attributes name:string,price:integer,oldprice:integer,image:text,description:text,specification:text,buyturn:integer,quantity:integer,brand_id:integer,category_id:integer
npx sequelize-cli model:generate --name OderDetail --attributes oder_id:integer,product_id:integer,price:integer,quantity:integer
npx sequelize-cli model:generate --name BannerDetail --attributes product_id:integer,banner_id:integer
npx sequelize-cli model:generate --name Feedback --attributes product_id:integer,user_id:integer,star:integer,comment:text
npx sequelize-cli model:generate --name NewsDetail2 --attributes product_id:integer,news_id:integer

Run Migration
npx sequelize-cli db:migrate

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
// const express = require("express");
dotenv.config();

const app = express();
app.use(express.json());
express.urlencoded({ extended: true });

import { AppRoute } from "./AppRoute";

app.get("/", (req, res) => {
  // http://localhost:3000/products
  res.send("Hello World!!!!");
});

const port = process?.env?.PORT ?? 3000;

AppRoute(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
