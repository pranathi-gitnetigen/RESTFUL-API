const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB Connected');
    seedDatabase();
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch(err => console.log(err));

app.use(bodyParser.json());

const Book = mongoose.model('Book', {
  title: { type: String, required: true },
  author: { type: String, required: true },
  publication_year: { type: Number, required: true },
});

const seedDatabase = async () => {
  const existingBooks = await Book.find();

  if (existingBooks.length === 0) {
    const booksToSeed = [
      { title: 'Book1', author: 'Author1', publication_year: 2022 },
      { title: 'Book2', author: 'Author2', publication_year: 2023 },
    ];

    await Book.insertMany(booksToSeed);
    console.log('Database seeded with initial books');
  } else {
    console.log('Database already has books, skipping seeding');
  }
};

app.get('/api/books', async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (error) {
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'There was an issue retrieving books. Please try again later.'
    });
  }
});

app.get('/api/books/:id', async (req, res) => {
  const book = await Book.findById(req.params.id);
  if (!book) {
    return res.status(404).json({ error: 'Book not found' });
  }
  res.json(book);
});

app.post('/api/books', async (req, res) => {
  const { title, author, publication_year } = req.body;

  try {
    if (!title || !author || !publication_year) {
      throw new Error('Missing required fields. Ensure \'title\', \'author\', and \'publication_year\' are provided.');
    }

    const existingBook = await Book.findOne({ title, author });
    if (existingBook) {
      throw new Error('A book with the same title and author already exists.');
    }

    const newBook = new Book({ title, author, publication_year });
    await newBook.save();
    res.status(201).json(newBook);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.put('/api/books/:id', async (req, res) => {
  const { title, author, publication_year } = req.body;

  try {
    const existingBook = await Book.findById(req.params.id);

    if (!existingBook) {
      return res.status(404).json({ error: 'Not possible to update non-existent book' });
    }

    const updatedBook = await Book.findByIdAndUpdate(
      req.params.id,
      { title, author, publication_year },
      { new: true }
    );

    res.json(updatedBook);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = app;