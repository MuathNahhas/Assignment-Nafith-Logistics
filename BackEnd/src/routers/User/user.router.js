const express = require("express");
const userRouter = express.Router();
const { createUser } = require("../Auth/signup.controller");
const { SignIn } = require("../Auth/login.controller");
const { getAllUser, deleteUser, updateUser } = require("./user.controller");
const { authentication } = require("../middlewares/authentication");
userRouter.post("/signUp", createUser);
userRouter.post("/login", SignIn);
userRouter.get("/AllUser", authentication, getAllUser);
userRouter.delete("/:userId", authentication, deleteUser);
userRouter.put("/:userId", authentication, updateUser);

module.exports = userRouter;
