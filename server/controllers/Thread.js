const express = require("express");
const router = express.Router();
const Thread = require("../models/Thread");
const User = require("../models/User");
router.post("/create", async (req, res) => {
  //console.log("catch------------------------------");
  const { title, content, userId, forumId } = req.body;
  const newThread = Thread({
    title,
    content,
    createdAt: Date(),
    forumId,
    userId,
  });

  await newThread.save();
  res.send(newThread);
});
router.post("/delete/:id", async (req, res) => {
  const thread = await Thread.findById(req.params.id);
  if (req.body.id == thread.userId) {
    thread.deleteOne({ _id: req.params.id }, function (err) {
      if (err) {
        console.error(err);
      } else {
        console.log("Document deleted successfully.");
      }
    });
    res.send("success");
    return;
  } else {
    res.send("Bạn không có quyền xóa bài người khác!");
  }
});

router.get("/:id", async (req, res) => {
  const thread = await Thread.findById(req.params.id);
  let this_user = await User.findById(thread.userId);
  let newData = {
    _id: thread._id,
    title: thread.title,
    createdAt: thread.createdAt,
    forumId: thread.forumId,
    content: thread.content,
    userId: thread.userId,
    name: this_user.name,
    image: this_user.image,
  };
  if (!thread) {
    res.status(404).send({
      message: "Thread not found",
    });
    return;
  }
  res.send(newData);
});

router.get("/forum/:id", async (req, res) => {
  const threads = await Thread.find({ forumId: req.params.id });

  let dataSend = [];
  for (let i = 0; i < threads.length; i++) {
    let thread = threads[i];
    let this_user = await User.findById(thread.userId);
    let newData = {
      _id: thread._id,
      title: thread.title,
      createdAt: thread.createdAt,
      forumId: thread.forumId,
      content: thread.content,
      userId: thread.userId,
      name: this_user.name,
      image: this_user.image,
    };
    dataSend.push(newData);
  }
  res.send(dataSend);
});

module.exports = router;
