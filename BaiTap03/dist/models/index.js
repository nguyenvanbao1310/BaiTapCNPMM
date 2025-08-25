"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const sequelize_1 = require("sequelize");
const process_1 = __importDefault(require("process"));
const config_json_1 = __importDefault(require("../config/config.json"));
const basename = path_1.default.basename(__filename);
const env = process_1.default.env.NODE_ENV ||
    "development";
const config = config_json_1.default[env]; // Có thể định nghĩa interface cho strict
// Khởi tạo sequelize
let sequelize;
if (config.use_env_variable) {
    sequelize = new sequelize_1.Sequelize(process_1.default.env[config.use_env_variable], config);
}
else {
    sequelize = new sequelize_1.Sequelize(config.database, config.username, config.password, config);
}
// Khởi tạo object chứa tất cả model
const db = {};
// Đọc tất cả file model trong thư mục hiện tại
fs_1.default.readdirSync(__dirname)
    .filter((file) => {
    return (file.indexOf(".") !== 0 &&
        file !== basename &&
        (file.endsWith(".ts") || file.endsWith(".js")) &&
        !file.endsWith(".test.ts"));
})
    .forEach((file) => {
    const modelImport = require(path_1.default.join(__dirname, file));
    const model = modelImport.default(sequelize, sequelize_1.DataTypes); // gọi default export
    db[model.name] = model;
});
// Gán associations nếu có
Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});
db.sequelize = sequelize;
db.Sequelize = sequelize_1.Sequelize;
exports.default = db;
