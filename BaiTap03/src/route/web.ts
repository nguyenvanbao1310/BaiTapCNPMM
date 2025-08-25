import express, { Application, Request, Response } from "express";
import homeController from "../controller/homeController";

const router = express.Router();

const initWebRoutes = (app: Application) => {
  router.get("/", (req: Request, res: Response) => {
    return res.send("Nguyễn Văn Bảo - 22110286");
  });

  router.get("/home", homeController.getHomePage);
  router.get("/about", homeController.getAboutPage);
  router.get("/crud", homeController.getCRUD);
  router.post("/post-crud", homeController.postCRUD);
  router.get("/get-crud", homeController.getFindAllCrud);
  router.get("/edit-crud", homeController.getEditCRUD);
  router.post("/put-crud", homeController.putCRUD);
  router.get("/delete-crud", homeController.deleteCRUD);

  return app.use("/", router);
};

export default initWebRoutes;
