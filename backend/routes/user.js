const express = require("express");
const UserRouter = express.Router();
const zod = require("zod");
const { User, Account } = require("../db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { authMiddleware } = require("../middlewares/authMiddleware");

const UserUpdateValidationSchema = zod.object({
  password: zod
    .string()
    .min(6, { message: "Password is too small" })
    .optional(),
  firstName: zod.string().optional(),
  lastName: zod.string().optional(),
});

const UserSignupValidationSchema = zod.object({
  username: zod
    .string()
    .min(3, { message: "Username is too short" })
    .max(15, { message: "Username is too long" }),

  password: zod.string().min(6, { message: "Password is too small" }),

  firstName: zod.string(),
  lastName: zod.string(),
});

const UserLoginValidationSchema = zod.object({
  username: zod
    .string()
    .min(3, { message: "Username is too short" })
    .max(15, { message: "Username is too long" }),

  password: zod.string().min(6, { message: "Password is too small" }),
});

//api/v1/user
UserRouter.post("/signup", async (req, res) => {
  const result = UserSignupValidationSchema.safeParse(req.body);

  if (!result.success) {
    return res.json({ message: "Input is not valid" });
  }

  const existingUser = await User.findOne({ username: req.body.username });

  if (existingUser) {
    return res.json({ message: "Username already exist!" });
  }

  const user = req.body;
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(user.password, salt);

  const dbUser = await User.create({ ...user, password: hashedPassword });

  await Account.create({
    userId: dbUser._id,
    balance: Math.random() * 10000 + 1,
  });

  return res.json({ message: "User created successfully" });
});

UserRouter.post("/login", async (req, res) => {
  const result = UserLoginValidationSchema.safeParse(req.body);

  if (!result.success) {
    return res.json({ message: "Input is not valid" });
  }

  const existingUser = await User.findOne({ username: req.body.username });

  if (!existingUser) {
    return res.json({
      message: "No User found! Kindly signup and then proceed",
    });
  }

  const isPasswordMatched = await bcrypt.compare(
    req.body.password,
    existingUser.password
  );

  if (!isPasswordMatched) {
    return res.json({ message: "Wrong credentials" });
  }

  const token = jwt.sign({ _id: existingUser._id }, process.env.JWT_SECRET);

  return res.json({ message: "Login successful!", token: token });
});

//api for updating user details
UserRouter.patch("/", authMiddleware, async (req, res) => {
  const { success } = UserUpdateValidationSchema.safeParse(req.body);

  if (!success) {
    return res.json({ messgae: "Invalid input" });
  }

  const password = req.body.password;
  if (password) {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    req.body.password = hashedPassword;
  }

  await User.updateOne({ _id: req._id }, req.body);

  return res.json({ message: "User udpated successfully!" });
});

UserRouter.get("/bulk", async (req, res) => {
  const filterKey = req.query.filter || " ";

  const users = await User.find({
    $or: [
      { firstName: new RegExp(filterKey, "i") },
      { lastName: new RegExp(filterKey, "i") },
    ],
  });

  res.json({
    user: users.map((user) => ({
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      _id: user._id,
    })),
  });
});

module.exports = { UserRouter };
