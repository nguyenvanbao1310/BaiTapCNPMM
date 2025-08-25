import fs from "fs";
import path from "path";
import { Sequelize, DataTypes } from "sequelize";
import process from "process";
import configFile from "../config/config.json";

const basename = path.basename(__filename);
const env =
  (process.env.NODE_ENV as "development" | "test" | "production") ||
  "development";
const config = (configFile as any)[env]; // Có thể định nghĩa interface cho strict

// Khởi tạo sequelize
let sequelize: Sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(
    process.env[config.use_env_variable] as string,
    config
  );
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

// Khởi tạo object chứa tất cả model
const db: { [key: string]: any } = {};

// Đọc tất cả file model trong thư mục hiện tại
fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 &&
      file !== basename &&
      (file.endsWith(".ts") || file.endsWith(".js")) &&
      !file.endsWith(".test.ts")
    );
  })
  .forEach((file) => {
    const modelImport = require(path.join(__dirname, file));
    const model = modelImport.default(sequelize, DataTypes); // gọi default export
    db[model.name] = model;
  });

// Gán associations nếu có
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
