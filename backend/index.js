const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const multer = require("multer");
require("dotenv").config();

const app = express();

const db = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});

app.use(express.json());
app.use(cors());
app.use(express.static("public"));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads");
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];
    cb(null, file.fieldname + "_" + Date.now() + "." + ext);
  },
});

const upload = multer({
  storage: storage,
});

app.get("/", (req, res) => {
  res.json({
    name: "ibrahim",
  });
});

app.get("/books", (req, res) => {
  const query = "SELECT * FROM books.book;";

  db.query(query, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.get("/books/:id", (req, res) => {
  const id = req.params.id;
  const query = "SELECT * FROM books.book WHERE bookId = ?";

  db.query(query, id, (err, results) => {
    if (err) res.json(err);
    res.json(results);
  });
});

app.post("/books", upload.single("bookCover"), (req, res) => {
  const { bookTitle, bookDescription } = req.body;
  const bookCover = req.file ? req.file.path : null;

  const query =
    "INSERT INTO book (`bookTitle`, `bookDescription`, `bookCover`) VALUES (?, ?, ?)";
  const values = [bookTitle, bookDescription, bookCover];

  db.query(query, values, (err, data) => {
    if (err) res.json(err);
    return res.json("The book has been successfully added");
  });
});

app.delete("/books/:id", (req, res) => {
  const id = req.params.id;
  const query = "DELETE FROM book WHERE bookId= ?";

  db.query(query, [id], (err, data) => {
    if (err) console.log(err);
    res.json({ message: "Book has been removed successfully" });
  });
});

app.put("/books/:id", upload.single("bookCover"), (req, res) => {
  const id = req.params.id;
  const { bookTitle, bookDescription } = req.body;
  const bookCover = req.file ? req.file.path : null;
  const query =
    "UPDATE book SET `bookTitle` = ?, `bookDescription` = ?, `bookCover` = ? WHERE bookId = ?";

  const values = [bookTitle, bookDescription, bookCover];

  console.log(bookCover);

  db.query(query, [...values, id], (err, data) => {
    if (err) console.log(err);
    res.json({ message: "Book has been updated successfully" });
  });
});

app.listen(8800, () => {
  console.log("Connect to backend at port: 8800");
});
