const db = require("better-sqlite3")()

const sql = `

-- Creator:       MySQL Workbench 8.0.31/ExportSQLite Plugin 0.1.0
-- Author:        nikib
-- Caption:       New Model
-- Project:       Name of the project
-- Changed:       2023-02-10 12:22
-- Created:       2023-02-07 13:05
PRAGMA foreign_keys = OFF;

-- Schema: teaHouse
ATTACH "teaHouse.sdb" AS "teaHouse";
BEGIN;
CREATE TABLE "teaHouse"."ussers"(
  "id" INTEGER PRIMARY KEY NOT NULL,
  "name" VARCHAR(45) NOT NULL,
  "email" VARCHAR(45) NOT NULL,
  "password" VARCHAR(30) NOT NULL,
  "address" VARCHAR(100) NOT NULL
);
CREATE TABLE "teaHouse"."teas"(
  "id" INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
  "tea" VARCHAR(45) NOT NULL,
  "description" TEXT NOT NULL,
  "price" DECIMAL NOT NULL,
  "image" VARCHAR(45)
);
CREATE TABLE "teaHouse"."orders"(
  "id" INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
  "userId" INTEGER NOT NULL,
  "orderDate" DATETIME NOT NULL,
  "totalAmount" DECIMAL NOT NULL,
  "ussers_id" INTEGER NOT NULL,
  CONSTRAINT "fk_orders_ussers1"
    FOREIGN KEY("ussers_id")
    REFERENCES "ussers"("id")
);
CREATE INDEX "teaHouse"."orders.fk_orders_ussers1_idx" ON "orders" ("ussers_id");
CREATE TABLE "teaHouse"."orders_has_teas"(
  "orders_id" INTEGER NOT NULL,
  "teas_id" INTEGER NOT NULL,
  PRIMARY KEY("orders_id","teas_id"),
  CONSTRAINT "fk_orders_has_teas_orders1"
    FOREIGN KEY("orders_id")
    REFERENCES "orders"("id"),
  CONSTRAINT "fk_orders_has_teas_teas1"
    FOREIGN KEY("teas_id")
    REFERENCES "teas"("id")
);
CREATE INDEX "teaHouse"."orders_has_teas.fk_orders_has_teas_teas1_idx" ON "orders_has_teas" ("teas_id");
CREATE INDEX "teaHouse"."orders_has_teas.fk_orders_has_teas_orders1_idx" ON "orders_has_teas" ("orders_id");
COMMIT;

`
db.exec(sql);