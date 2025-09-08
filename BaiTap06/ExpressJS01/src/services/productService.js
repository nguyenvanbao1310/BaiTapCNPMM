// services/product.service.js
const Product = require("../models/Product");
const Category = require("../models/Category");
const esClient = require("../config/elasticsearch");
const PRODUCT_INDEX = "products";


// Tạo product mới (Mongo + index vào Elasticsearch)
const createProduct = async (data) => {
  const {
    name,
    category,
    brand,
    cpu,
    ram,
    storage,
    gpu,
    screen,
    price,
    quantity,
    description,
    imageUrl,
    discount = 0,
    views = 0,
  } = data;

  // Kiểm tra category
  const categoryExist = await Category.findById(category);
  if (!categoryExist) {
    throw new Error("Category not found");
  }

  // Lưu vào MongoDB
  const product = await Product.create({
    name,
    category,
    brand,
    cpu,
    ram,
    storage,
    gpu,
    screen,
    price,
    quantity,
    description,
    imageUrl,
    discount,
    views,
  });

  // Index vào Elasticsearch
  await esClient.index({
    index: PRODUCT_INDEX,
    id: product._id.toString(),
    document: {
      name,
      category,
      brand,
      cpu,
      ram,
      storage,
      gpu,
      screen,
      price,
      quantity,
      description,
      imageUrl,
      discount,
      views,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
    },
  });

  return product;
};

// Lấy sản phẩm (MongoDB, vẫn giữ nguyên)
const getProducts = async ({ page = 1, limit = 5, category }) => {
  page = Number(page);
  limit = Number(limit);

  const query = category ? { category } : {};

  const totalItems = await Product.countDocuments(query);
  const totalPages = Math.ceil(totalItems / limit);

  const products = await Product.find(query)
    .populate("category")
    .skip((page - 1) * limit)
    .limit(limit);

  return {
    data: products,
    totalPages,
    currentPage: page,
    totalItems,
  };
};

// Search với Elasticsearch (fuzzy + filter)
const searchProducts = async (params) => {
  const {
    page = 1,
    limit = 10,
    name,
    category,
    brand,
    minPrice,
    maxPrice,
    discount,
    minViews,
    maxViews,
  } = params;

  // Tạo mảng điều kiện must
  const must = [];

  if (name) {
    must.push({
      match_phrase_prefix: { name: name }, // tìm theo prefix
    });
  }

  if (category) must.push({ term: { category } });
  if (brand) must.push({ term: { brand } });
  if (minPrice !== undefined || maxPrice !== undefined) {
    must.push({
      range: {
        price: {
          gte: minPrice ?? 0,
          lte: maxPrice ?? 1000000,
        },
      },
    });
  }
  if (discount !== undefined && discount > 0) {
    must.push({ range: { discount: { gte: discount } } });
  }
  if (
    (minViews !== undefined && minViews >= 0) ||
    (maxViews !== undefined && maxViews >= 0)
  ) {
    must.push({
      range: {
        views: {
          gte: minViews ?? 0,
          lte: maxViews ?? 1000000,
        },
      },
    });
  }

  // Tạo object query
  const query = must.length > 0 ? { bool: { must } } : { match_all: {} };

  // Thực hiện search
  const result = await esClient.search({
    index: PRODUCT_INDEX,
    from: (page - 1) * limit,
    size: limit,
    body: { query },
  });

  // Map kết quả
  const products = result.hits.hits.map((hit) => ({
    _id: hit._id,
    ...hit._source,
  }));

  return {
    data: products,
    totalItems: result.hits.total.value,
  };
};

module.exports = {
  createProduct,
  getProducts,
  searchProducts,
};
