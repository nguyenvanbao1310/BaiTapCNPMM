import { Request, Response } from "express";
import db from "../models"; // trong TS thường không cần .js đuôi
import CRUDService from "../services/CRUDService";

const getHomePage = async (req: Request, res: Response): Promise<void> => {
  try {
    const data = await db.User.findAll();
    res.render("homepage.ejs", {
      data: JSON.stringify(data),
    });
  } catch (e) {
    console.error(e);
    res.send("Error loading homepage");
  }
};

const getAboutPage = (req: Request, res: Response): void => {
  res.render("test/about.ejs");
};

const getCRUD = (req: Request, res: Response): void => {
  res.render("crud.ejs");
};

const postCRUD = async (req: Request, res: Response): Promise<void> => {
  const message = await CRUDService.createNewUser(req.body);
  console.log(message);
  res.send("Post crud to server");
};

const getFindAllCrud = async (req: Request, res: Response): Promise<void> => {
  try {
    const data = await CRUDService.getAllUser();
    console.log("Data from service:", data);

    res.render("users/findAllUser.ejs", {
      datalist: data,
    });
  } catch (error) {
    console.error("Error in getFindAllCrud:", error);
    res.send("Error loading users");
  }
};

const getEditCRUD = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = Number(req.query.id); // ✅ ép kiểu về number
    console.log("Editing user ID:", userId);

    if (!isNaN(userId)) {
      const userData = await CRUDService.getUserInfoById(userId);
      console.log("User data for edit:", userData);

      if (userData && userData.id) {
        res.render("users/updateUser.ejs", {
          data: userData,
        });
      } else {
        res.send("User not found");
      }
    } else {
      res.send("không lấy được id");
    }
  } catch (error) {
    console.error("Error in getEditCRUD:", error);
    res.send("Error loading edit page");
  }
};

const putCRUD = async (req: Request, res: Response): Promise<void> => {
  const data = req.body;
  const allUsers = await CRUDService.updateUser(data);
  res.render("users/findAllUser.ejs", {
    datalist: allUsers,
  });
};

const deleteCRUD = async (req: Request, res: Response): Promise<void> => {
  const id = Number(req.query.id); // ✅ ép kiểu về number
  if (!isNaN(id)) {
    await CRUDService.deleteUserById(id);
    res.send("Deleted!!!!!!!!!!!!!");
  } else {
    res.send("Not find user");
  }
};

export default {
  getHomePage,
  getAboutPage,
  getCRUD,
  postCRUD,
  getFindAllCrud,
  getEditCRUD,
  putCRUD,
  deleteCRUD,
};
