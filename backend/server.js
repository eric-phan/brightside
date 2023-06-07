require("dotenv").config({ path: "./config/.env" });
const express = require("express");
const mongoose = require("mongoose");
const postRoutes = require("./routes/posts");
const userRoutes = require("./routes/user");
var bodyParser = require("body-parser");
var cors = require("cors");

// express app
const app = express();

// middleware
app.use(express.json());
// up limit to upload larger images

app.use(bodyParser.json({ limit: "10mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "10mb",
    extended: true,
  })
);
app.use(cors());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// routes
app.use("/api/posts", postRoutes);
app.use("/api/user", userRoutes);

// connect to db
const PORT = process.env.PORT || 5000;
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    // listen for requests
    app.listen(PORT, () => {
      console.log(`Connected to db & listening on Port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
