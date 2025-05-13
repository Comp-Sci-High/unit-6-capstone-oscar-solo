const mongoose = require("mongoose");
const express = require("express");

const app = express();

app.use(express.static(__dirname + "/public"));

app.use(express.json());

app.set("view engine", "ejs");

app.use((req, res, next) => {
    console.log(`${req.method}: ${req.path}`);
    next();
});

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, reuired: true},
  pagesRead: { type: Number, default: 0 },
  totalPages: { type: Number, default: 1000 }
});

const Book = mongoose.model("Book", bookSchema, "Books");


app.get("/", async (req, res) => {
  const books = await Book.find({});
  res.render("books.ejs", { books });
});


app.delete("/delete/:_id", async (req, res) => {
  const deleted = await Book.findByIdAndDelete(req.params._id);
  res.json(deleted);
});

app.patch("/update/:_id", async (req, res) => {
  const updated = await Book.findByIdAndUpdate(req.params._id, req.body, { new: true });
  res.json(updated);
});
 app.post("/books/save", async (req, res) => {
 const book = await new Book({
 title: req.body.title,
 author: req.body.author,
 pagesRead: req.body.pagesRead,
  totalPages: req.body.totalPages
}).save()
   res.json(book);
 });

//  Connect to MongoDB and Start Server
async function startServer() {
  await mongoose.connect("mongodb+srv://SE12:CSH2025@cluster0.lzdbf.mongodb.net/SE12?retryWrites=true&w=majority&appName=Cluster0");

 

  app.listen(3000, () => {
    console.log(`Server running.`);
  });
}

startServer();
