const express = require("express");
const router = express.Router();
const Category = require("../models/Category");
const Forum = require("../models/Forum");

router.post("/create", async (req, res) => {
  const { title, userId } = req.body;
  const newCategory = Category({
    title,
    createdAt: Date(),
    userId,
  });

  await newCategory.save();
  res.send(newCategory);
});

router.get("/:id", async (req, res) => {
  const cat = await Category.findById(req.params.id);
  const forums = await Forum.find({ categoryId: cat._id });
  let cs = await Category.findByIdAndUpdate(req.params.id, {
    NumberForum: forums.length,
  });
  if (!cat) {
    res.status(404).send({
      message: "Category not found",
    });
    return;
  }

  res.send(cat);
});
router.post("/delete/:id", async (req, res) => {
  Category.deleteOne({ _id: req.params.id }, function (err) {
    if (err) {
      console.error(err);
    } else {
      console.log("Document deleted successfully.");
    }
  });
});

router.get("/", async (req, res) => {
  const cats = await Category.find({});
  res.send(cats);
});
module.exports = router;
