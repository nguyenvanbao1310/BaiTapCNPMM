"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const models_1 = __importDefault(require("../models")); // models/index.ts
const salt = bcryptjs_1.default.genSaltSync(10);
// Hash password
const hashUserPassword = async (password) => {
    try {
        const hashPassword = bcryptjs_1.default.hashSync(password, salt);
        return hashPassword;
    }
    catch (e) {
        throw e;
    }
};
// Create user
const createNewUser = async (data) => {
    try {
        const hashPasswordFromBcrypt = await hashUserPassword(data.password);
        await models_1.default.User.create({
            email: data.email,
            password: hashPasswordFromBcrypt,
            firstName: data.firstName,
            lastName: data.lastName,
            address: data.address,
            phoneNumber: data.phoneNumber,
            gender: data.gender === "1" ? true : false,
            roleId: data.roleId,
        });
        return "✅ OK create a new user successful!";
    }
    catch (e) {
        throw e;
    }
};
// Get all users
const getAllUser = async () => {
    try {
        const users = await models_1.default.User.findAll({
            raw: true,
        });
        return users;
    }
    catch (e) {
        console.error("Error in getAllUser:", e);
        throw e;
    }
};
// Get user by ID
const getUserInfoById = async (userId) => {
    try {
        const user = await models_1.default.User.findOne({
            where: { id: userId },
            raw: true,
        });
        return user;
    }
    catch (e) {
        console.error("Error in getUserInfoById:", e);
        throw e;
    }
};
// Update user
const updateUser = async (data) => {
    try {
        const user = await models_1.default.User.findOne({
            where: { id: data.id },
        });
        if (user) {
            user.firstName = data.firstName;
            user.lastName = data.lastName;
            user.address = data.address;
            user.phoneNumber = data.phoneNumber;
            await user.save();
            const allUsers = await models_1.default.User.findAll();
            return allUsers;
        }
    }
    catch (e) {
        throw e;
    }
};
// Delete user
const deleteUserById = async (userId) => {
    try {
        const user = await models_1.default.User.findOne({
            where: { id: userId },
        });
        if (user) {
            await user.destroy();
        }
    }
    catch (e) {
        throw e;
    }
};
exports.default = {
    createNewUser,
    getAllUser,
    getUserInfoById,
    updateUser,
    deleteUserById,
};
