const express = require("express");

const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
app.use(cors());
app.use(express.json());
require("dotenv").config();

//configure mongoose
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/Cars",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Connected to MongoDB");
    }
  }
);

const userRouter = require("./routes/UserRoutes");
const carsRouter = require("./routes/CarRoutes");
const catsRouter = require("./routes/CatsRoutes");

const { Middleware } = require("./middleware/verifyToken");

app.use("/api/users", userRouter);
app.use("/api/cars", Middleware, carsRouter);
app.use("/api/cats", Middleware, catsRouter);

app.listen(1338, () => {
  console.log(`Backend Started at Port 1338`);
});
