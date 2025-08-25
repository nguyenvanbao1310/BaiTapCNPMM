import bcrypt from "bcryptjs";
import db from "../models"; // models/index.ts
import { User } from "../models/user"; // nếu bạn export User từ models/user.ts

const salt = bcrypt.genSaltSync(10);

// Hash password
const hashUserPassword = async (password: string): Promise<string> => {
  try {
    const hashPassword = bcrypt.hashSync(password, salt);
    return hashPassword;
  } catch (e) {
    throw e;
  }
};

// Create user
const createNewUser = async (data: any): Promise<string> => {
  try {
    const hashPasswordFromBcrypt = await hashUserPassword(data.password);

    await db.User.create({
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
  } catch (e) {
    throw e;
  }
};

// Get all users
const getAllUser = async (): Promise<User[]> => {
  try {
    const users = await db.User.findAll({
      raw: true,
    });
    return users;
  } catch (e) {
    console.error("Error in getAllUser:", e);
    throw e;
  }
};

// Get user by ID
const getUserInfoById = async (userId: number): Promise<User | null> => {
  try {
    const user = await db.User.findOne({
      where: { id: userId },
      raw: true,
    });
    return user;
  } catch (e) {
    console.error("Error in getUserInfoById:", e);
    throw e;
  }
};

// Update user
const updateUser = async (data: any): Promise<User[] | undefined> => {
  try {
    const user = await db.User.findOne({
      where: { id: data.id },
    });

    if (user) {
      user.firstName = data.firstName;
      user.lastName = data.lastName;
      user.address = data.address;
      user.phoneNumber = data.phoneNumber;
      await user.save();

      const allUsers = await db.User.findAll();
      return allUsers;
    }
  } catch (e) {
    throw e;
  }
};

// Delete user
const deleteUserById = async (userId: number): Promise<void> => {
  try {
    const user = await db.User.findOne({
      where: { id: userId },
    });
    if (user) {
      await user.destroy();
    }
  } catch (e) {
    throw e;
  }
};

export default {
  createNewUser,
  getAllUser,
  getUserInfoById,
  updateUser,
  deleteUserById,
};
