var colors = require("colors");
const express = require("express");
// const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const mongoDB = require("mongoose");
const path = require("path");
const multer = require("multer");
const authRouter = require("./routes/auth");
const usersRouter = require("./routes/users");
const postsRouter = require("./routes/posts");
const categoriesRouter = require("./routes/categories");
const PORT = process.env.PORT || 3000;
const app = express();
dotenv.config();
app.use(express.json());
// app.use(bodyParser.json());
console.log(process.env.MONGO_URL || "ssssss");
mongoDB.set("strictQuery", false);

mongoDB
  .connect(
    "mongodb+srv://Soheb:Soheb%401999@cluster0.cbtaqjr.mongodb.net/newOne?retryWrites=true&w=majority",
    { useNewUrlParser: true }
  )
  .then(console.log(`connect to database`.bgGreen))
  .catch((error) => {
    console.log("Error:".bgRed, error);
  });

// Image UPLOAD code
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  res.status(200).json("Image Uploaded successfully");
});

app.get("/lama", (req, res) => {
  console.log(`request is called on /lama`.red);
  res.send(`request is called on /lama`);
});
app.post("/ll", (req, res) => {
  let data = req.body;
  console.log("post /lama".bgRed, req);
  res.send("Data Received: " + JSON.stringify(data));
});

app.use("/api/auth", authRouter);
app.use("/api/users", usersRouter);
app.use("/api/posts", postsRouter);
app.use("/api/categories", categoriesRouter);

app.listen(PORT, (req, res) => {
  console.log("Listning on port 3000");
});
