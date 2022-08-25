const express = require("express");
const cors = require("cors");
const PORT = 5000;
const app = express();
app.use(express.json());
app.use(cors());
require("./db/db");
const userRouter = require("./src/routers/User/user.router");
//Router
app.use("/", userRouter);

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
