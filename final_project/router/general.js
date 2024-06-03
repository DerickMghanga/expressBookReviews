const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


const doesExist = (username) => {
  let userswithsamename = users.filter((user) => {
    return user.username === username
  });
  if (userswithsamename.length > 0) {
    return true;
  } else {
    return false;
  }
}

public_users.post("/register", (req, res) => {
  //Write your code here
  const username = req.body.username;
  const password = req.body.password;

  if (username && password) {
    if (!doesExist(username)) {
      users.push({ "username": username, "password": password });
      return res.status(200).json({ message: "User successfully registred. Now you can login" });
    } else {
      return res.status(404).json({ message: "User already exists!" });
    }
  }
  return res.status(404).json({ message: "Unable to register user." });
  //return res.status(300).json({ message: "Yet to be implemented" });
});

// Get the book list available in the shop
public_users.get('/', function (req, res) {
  //Write your code here

  const getBooks = Promise.resolve(books)

  getBooks.then((bks) => {
    res.send(bks)
  })

  //return res.status(300).json({message: "Yet to be implemented"});
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn', function (req, res) {
  //Write your code here
  const isbn = req.params.isbn

  const getBooks = Promise.resolve(books)

  getBooks.then((bks) => {
    let book = bks[isbn]
    res.send(book)
  })

  //return res.status(300).json({ message: "Yet to be implemented" });
});

// Get book details based on author
public_users.get('/author/:author', function (req, res) {
  //Write your code here
  const author = req.params.author

  const getBooks = Promise.resolve(books)

  getBooks.then((bksArray) => {
    const booksList = Object.values(bksArray)
    const book = booksList.filter((book) => book['author'] === author)
    res.send(book)
  })

  //return res.status(300).json({ message: "Yet to be implemented" });
});

// Get all books based on title
public_users.get('/title/:title', function (req, res) {
  //Write your code here
  const title = req.params.title

  const getBooks = Promise.resolve(books)

  getBooks.then((booksObj) => {
    const booksList = Object.values(booksObj)

    const book = booksList.filter((book) => book['title'] === title)

    res.send(book[0])
  })


  //return res.status(300).json({ message: "Yet to be implemented" });
});

//  Get book review
public_users.get('/review/:isbn', function (req, res) {
  //Write your code here
  const isbn = req.params.isbn

  const bk = books[isbn]

  res.send(bk['reviews'])

  //return res.status(300).json({ message: "Yet to be implemented" });
});

module.exports.general = public_users;
