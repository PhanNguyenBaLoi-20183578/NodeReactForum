const express = require("express");
const router = express.Router();
const Forum = require("../models/Forum");
const Thread = require("../models/Thread");

router.post("/create", async (req, res) => {
  const { title, categoryId, userId } = req.body;
  const newForum = Forum({
    title,
    createdAt: Date(),
    categoryId,
    userId,
  });
  console.log("creat forum");
  await newForum.save();
  res.send(newForum);
});

router.get("/:id", async (req, res) => {
  const forum = await Forum.findById(req.params.id);
  if (!forum) {
    res.status(404).send({
      message: "Forum not found",
    });
    return;
  }

  res.send(forum);
});
router.post("/delete/:id", async (req, res) => {
  if (req.body.isAdmin) {
    res.send("delete");
    Forum.deleteOne({ _id: req.params.id }, function (err) {
      if (err) {
        console.error(err);
      } else {
        console.log("Document deleted successfully.");
      }
    });
    return;
  } else {
    res.send("Bạn không có quyền xóa");
    return;
  }
});
router.get("/category/:id", async (req, res) => {
  const forums = await Forum.find({ categoryId: req.params.id });

  res.send(forums);
});

module.exports = router;
