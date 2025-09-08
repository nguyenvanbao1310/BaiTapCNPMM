// controllers/product.controller.js
const productService = require("../services/productService");

const createProduct = async (req, res) => {
  try {
    const product = await productService.createProduct(req.body);
    return res.status(201).json(product);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

const getProducts = async (req, res) => {
  try {
    const products = await productService.getProducts(req.query);
    return res.status(200).json(products);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const searchProducts = async (req, res) => {
  try {
    const products = await productService.searchProducts(req.query);
    return res.json(products);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createProduct,
  getProducts,
  searchProducts,
};
