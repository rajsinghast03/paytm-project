require("dotenv").config();
const express = require("express");
const app = express();
const { apiRouter } = require("./routes/index");
const { connectDb } = require("./db");
const cors = require("cors");
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

connectDb();
app.use("/api/v1", apiRouter);
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
