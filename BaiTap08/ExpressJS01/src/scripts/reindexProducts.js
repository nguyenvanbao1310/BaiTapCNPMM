// scripts/reindexProducts.js
const mongoose = require("mongoose");
const Product = require("../models/Product");
const esClient = require("../config/elasticsearch");

const PRODUCT_INDEX = "products";

(async () => {
  try {
    // 1. Kết nối MongoDB
    await mongoose.connect("mongodb://localhost:27017/shopproduct", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB connected");

    // 2. Lấy toàn bộ product trong MongoDB
    const products = await Product.find();
    console.log(`Found ${products.length} products`);

    // 3. Tạo index trong Elasticsearch (nếu chưa có)
    const exists = await esClient.indices.exists({ index: PRODUCT_INDEX });
    if (!exists) {
      await esClient.indices.create({
        index: PRODUCT_INDEX,
        mappings: {
          properties: {
            name: { type: "text" },
            description: { type: "text" },
            brand: { type: "keyword" },
            category: { type: "keyword" },
            price: { type: "double" },
            quantity: { type: "integer" },
            discount: { type: "double" },
            views: { type: "integer" },
            createdAt: { type: "date" },
            updatedAt: { type: "date" },
          },
        },
      });
      console.log("✅ Created Elasticsearch index");
    }

    // 4. Index từng sản phẩm vào Elasticsearch
    for (const product of products) {
      await esClient.index({
        index: PRODUCT_INDEX,
        id: product._id.toString(),
        document: {
          name: product.name,
          category: product.category.toString(),
          brand: product.brand,
          cpu: product.cpu,
          ram: product.ram,
          storage: product.storage,
          gpu: product.gpu,
          screen: product.screen,
          price: product.price,
          quantity: product.quantity,
          description: product.description,
          imageUrl: product.imageUrl,
          discount: product.discount || 0,
          views: product.views || 0,
          createdAt: product.createdAt,
          updatedAt: product.updatedAt,
        },
      });
    }

    console.log("✅ Reindexed all products to Elasticsearch");
    process.exit(0);
  } catch (err) {
    console.error("❌ Error reindexing:", err);
    process.exit(1);
  }
})();
