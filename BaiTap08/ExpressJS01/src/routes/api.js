const express = require("express");
const {
  createUser,
  handleLogin,
  getUser,
  getAccount,
} = require("../controllers/userController");
const auth = require("../middleware/auth");
const delay = require("../middleware/delay");

const {
  createProduct,
  getProducts,
  searchProducts,
  getSimilarProducts,
  getProductById,
  getProductStats,
} = require("../controllers/productController");

const {
  createCategory,
  getCategories,
} = require("../controllers/categoryController");

const {
  createView,
  getViews,
  getViewsByUser,
} = require("../controllers/viewController");

const {
  addFavourite,
  getFavourites,
  getFavouritesByUser,
  removeFavourite,
} = require("../controllers/favouriteController");

const {
  createComment,
  getComments,
  deleteComment,
} = require("../controllers/commentController");

const {
  createOrder,
  getOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
} = require("../controllers/orderController");

const routerAPI = express.Router();

// routerAPI.use(auth);

routerAPI.get("/", (req, res) => {
  return res.status(200).json("Hello world api");
});

/* USER */
routerAPI.post("/register", createUser);
routerAPI.post("/login", handleLogin);
routerAPI.get("/user", getUser);
routerAPI.get("/account", delay, getAccount);

/* CATEGORY */
routerAPI.post("/categories", createCategory);
routerAPI.get("/categories", getCategories);

/* PRODUCT */
routerAPI.post("/products", createProduct);
routerAPI.get("/products", getProducts);
routerAPI.get("/products/search", searchProducts);
routerAPI.get("/products/:id/similar", getSimilarProducts);
routerAPI.get("/products/:id/", getProductById);
routerAPI.get("/products/:id/stats", getProductStats);

/* VIEW */
routerAPI.post("/views", createView);
routerAPI.get("/views", getViews);
routerAPI.get("/views/:userId", getViewsByUser);

/* FAVOURITE */
routerAPI.post("/favourites", addFavourite);
routerAPI.get("/favourites", getFavourites);
routerAPI.delete("/favourites/:userId/:productId", removeFavourite);
routerAPI.get("/favourites/:userId", getFavouritesByUser);
/* COMMENT */
routerAPI.post("/comments", createComment);
routerAPI.get("/comments", getComments);
routerAPI.delete("/comments/:id", deleteComment);

/* ORDER */
routerAPI.post("/orders", createOrder);
routerAPI.get("/orders", getOrders);
routerAPI.get("/orders/:id", getOrderById);
routerAPI.put("/orders/:id", updateOrder);
routerAPI.delete("/orders/:id", deleteOrder);

module.exports = routerAPI;
