const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: String,
  email: String,
  password: String,
  image: String,
  createdAt: String,
  isAdmin: false,
});

UserSchema.pre("save", async function (next) {
  //async next=> lai ko dc????
  var user = this;
  if (!user.isModified("password")) return next();

  const hash = await bcrypt.hash(user.password, 10);
  user.password = hash;
  next();
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
