// controllers/comment.controller.js
const commentService = require("../services/commentService");

async function createComment(req, res) {
  try {
    const comment = await commentService.createComment(req.body);
    res.status(201).json(comment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

async function getComments(req, res) {
  try {
    const comments = await commentService.getAllComments();
    res.json(comments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

async function deleteComment(req, res) {
  try {
    await commentService.deleteComment(req.params.id);
    res.json({ message: "Comment deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

module.exports = { createComment, getComments, deleteComment };
