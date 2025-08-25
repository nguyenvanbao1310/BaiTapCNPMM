"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const sequelize_1 = require("sequelize");
class User extends sequelize_1.Model {
    static associate(models) {
        // định nghĩa quan hệ ở đây
    }
}
exports.User = User;
exports.default = (sequelize, DataTypes) => {
    User.init({
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        email: { type: DataTypes.STRING, allowNull: false },
        password: { type: DataTypes.STRING, allowNull: false },
        firstName: { type: DataTypes.STRING, allowNull: true },
        lastName: { type: DataTypes.STRING, allowNull: true },
        address: { type: DataTypes.STRING, allowNull: true },
        phoneNumber: { type: DataTypes.STRING, allowNull: true },
        gender: { type: DataTypes.BOOLEAN, allowNull: true },
        image: { type: DataTypes.STRING, allowNull: true },
        roleId: { type: DataTypes.STRING, allowNull: true },
        positionId: { type: DataTypes.STRING, allowNull: true },
    }, {
        sequelize,
        modelName: "User",
        tableName: "Users",
    });
    return User; // 👈 phải return model
};
