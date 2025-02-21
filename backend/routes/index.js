const express = require("express");
const { UserRouter } = require("./user");
const { accountRouter } = require("./account");
const apiRouter = express.Router();

//routes the incoming get requests of /api/v1/user to UserRouter
apiRouter.use("/user", UserRouter);
//routes the incoming get requests of /api/v1/account to accountRouter
apiRouter.use("/account", accountRouter);

module.exports = { apiRouter };
