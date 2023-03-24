const express = require("express");
const router = express.Router();
const Post = require("../models/Post");
var request = require("request-promise");
const User = require("../models/User");
router.post("/create", async (req, res) => {
  //console.log("catch------------------------------");
  const { content, userId, threadId } = req.body;
  var newPost = Post({
    content,
    createdAt: Date(),
    threadId,
    userId,
  });
  var data = {
    content: content,
  };

  var options = {
    method: "POST",
    // http:flaskserverurl:port/route
    uri: "http://127.0.0.1:5000/arraysum",
    body: data,
    json: true,
  };
  var sendrequest = await request(options)
    .then(function (parsedBody) {
      let result;
      result = parsedBody["result"];
      if (result) {
        newPost = "spam";
      }
    })
    .catch(function (err) {
      //console.log(err);
    });
  if (newPost != "spam") {
    //console.log("save");
    await newPost.save();
  }

  res.send(newPost);
});
router.post("/delete/:id", async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (req.body.id == post.userId) {
    Post.deleteOne({ _id: req.params.id }, function (err) {
      if (err) {
        console.error(err);
      } else {
        console.log("Document deleted successfully.");
      }
    });
    res.send("success");
    return;
  } else {
    res.send("Bạn không có quyền xóa comment người khác");
  }
});

router.get("/thread/:id", async (req, res) => {
  const page = req.query.page;
  const perPage = 10;
  const posts = await Post.find({ threadId: req.params.id })
    .limit(perPage)
    .skip(perPage * (page - 1));
  let dataSend = [];
  for (let i = 0; i < posts.length; i++) {
    let post = posts[i];
    let this_user = await User.findById(post.userId);
    let newData = {
      _id: post._id,
      createdAt: post.createdAt,
      threadId: post.threadId,
      content: post.content,
      userId: post.userId,
      name: this_user.name,
      image: this_user.image,
    };
    dataSend.push(newData);
  }
  res.send(dataSend);
});

module.exports = router;
