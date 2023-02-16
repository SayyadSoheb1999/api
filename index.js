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

const app = express();
dotenv.config();
app.use(express.json());
// app.use(bodyParser.json());
console.log(process.env.MONGO_URL || "ssssss");
mongoDB.set("strictQuery", false);

mongoDB
  .connect(
    "mongodb+srv://Soheb:Soheb%401999@cluster0.cbtaqjr.mongodb.net/blog?retryWrites=true&w=majority",
    { useNewUrlParser: true }
  )
  .then(console.log(`connect to database`))
  .catch((error) => {
    console.log("Error:", error);
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

// app.get("/lama", (req, res) => {
//   console.log(`request is called on /lama`);
//   res.send(`request is called on /lama`);
// });
// app.post("/ll", (req, res) => {
//   let data = req.body;
//   console.log("post /lama", req);
//   res.send("Data Received: " + JSON.stringify(data));
// });

app.use("/api/auth", authRouter);
app.use("/api/users", usersRouter);
app.use("/api/posts", postsRouter);
app.use("/api/categories", categoriesRouter);

app.listen(5000, (req, res) => {
  console.log("Listning on port 5000");
});
