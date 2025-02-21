const express = require("express");
const { UserRouter } = require("./user");
const apiRouter = express.Router();

//handles get req on /api/v1
apiRouter.get("/", (req, res) => {
  res.send(`<h1>Hello from the api Router</h1>`);
});

//routes the incoming get requests of /api/v1/user to UserRouter
apiRouter.use("/user", UserRouter);

module.exports = { apiRouter };
