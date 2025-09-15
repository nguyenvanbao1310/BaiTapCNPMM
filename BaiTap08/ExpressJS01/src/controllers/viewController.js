// controllers/view.controller.js
const viewService = require("../services/viewedService");

async function createView(req, res) {
  try {
    console.log("📥 [createView] req.body:", req.body); // log dữ liệu client gửi lên

    const view = await viewService.createView(req.body);

    console.log("✅ [createView] view created:", view); // log kết quả sau khi insert
    res.status(201).json(view);
  } catch (err) {
    console.error("❌ [createView] error:", err.message); // log lỗi
    res.status(400).json({ message: err.message });
  }
}

async function getViews(req, res) {
  try {
    console.log("📥 [getViews] called"); // log khi API được gọi

    const views = await viewService.getAllViews();

    console.log("✅ [getViews] found views:", views.length); // log số lượng view lấy được
    res.json(views);
  } catch (err) {
    console.error("❌ [getViews] error:", err.message);
    res.status(500).json({ message: err.message });
  }
}

async function getViewsByUser(req, res) {
  try {
    const { userId } = req.params;

    const views = await viewService.getViewsByUser(userId);
    res.json(views);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

module.exports = { createView, getViews, getViewsByUser };
