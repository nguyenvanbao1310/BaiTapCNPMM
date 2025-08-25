"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = __importDefault(require("../models")); // trong TS thường không cần .js đuôi
const CRUDService_1 = __importDefault(require("../services/CRUDService"));
const getHomePage = async (req, res) => {
    try {
        const data = await models_1.default.User.findAll();
        res.render("homepage.ejs", {
            data: JSON.stringify(data),
        });
    }
    catch (e) {
        console.error(e);
        res.send("Error loading homepage");
    }
};
const getAboutPage = (req, res) => {
    res.render("test/about.ejs");
};
const getCRUD = (req, res) => {
    res.render("crud.ejs");
};
const postCRUD = async (req, res) => {
    const message = await CRUDService_1.default.createNewUser(req.body);
    console.log(message);
    res.send("Post crud to server");
};
const getFindAllCrud = async (req, res) => {
    try {
        const data = await CRUDService_1.default.getAllUser();
        console.log("Data from service:", data);
        res.render("users/findAllUser.ejs", {
            datalist: data,
        });
    }
    catch (error) {
        console.error("Error in getFindAllCrud:", error);
        res.send("Error loading users");
    }
};
const getEditCRUD = async (req, res) => {
    try {
        const userId = Number(req.query.id); // ✅ ép kiểu về number
        console.log("Editing user ID:", userId);
        if (!isNaN(userId)) {
            const userData = await CRUDService_1.default.getUserInfoById(userId);
            console.log("User data for edit:", userData);
            if (userData && userData.id) {
                res.render("users/updateUser.ejs", {
                    data: userData,
                });
            }
            else {
                res.send("User not found");
            }
        }
        else {
            res.send("không lấy được id");
        }
    }
    catch (error) {
        console.error("Error in getEditCRUD:", error);
        res.send("Error loading edit page");
    }
};
const putCRUD = async (req, res) => {
    const data = req.body;
    const allUsers = await CRUDService_1.default.updateUser(data);
    res.render("users/findAllUser.ejs", {
        datalist: allUsers,
    });
};
const deleteCRUD = async (req, res) => {
    const id = Number(req.query.id); // ✅ ép kiểu về number
    if (!isNaN(id)) {
        await CRUDService_1.default.deleteUserById(id);
        res.send("Deleted!!!!!!!!!!!!!");
    }
    else {
        res.send("Not find user");
    }
};
exports.default = {
    getHomePage,
    getAboutPage,
    getCRUD,
    postCRUD,
    getFindAllCrud,
    getEditCRUD,
    putCRUD,
    deleteCRUD,
};
