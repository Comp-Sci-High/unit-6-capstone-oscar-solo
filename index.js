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
  cover: {
    type: String,
    default: ""
  },
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


async function prepopulateDb() {
  try {
    await Book.insertMany([
      { title: "The Giver", totalPages: 180 },
      { title: "Of Mice and Men", totalPages: 107 },
      { title: "Fahrenheit 451", totalPages: 158 }
    ]);

    console.log('Books added successfully!');
  } catch (err) {
    console.error('Error prepopulating database:', err);
  }
}

//  Connect to MongoDB and Start Server
async function startServer() {
  await mongoose.connect("mongodb+srv://SE12:CSH2025@cluster0.lzdbf.mongodb.net/SE12?retryWrites=true&w=majority&appName=Cluster0");

  // Uncomment ONCE to add sample books, then comment again
  // await prepopulateDb();

  app.listen(3000, () => {
    console.log(`Server running.`);
  });
}

startServer();
