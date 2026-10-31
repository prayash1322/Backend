# Book Store

A simple backend for a book store. You can add books (with a cover picture), look at them, change them, delete them and even buy them. It is built with Node.js, Express and MongoDB.

## What you need before starting

- Node.js installed on your computer
- A MongoDB database (a free MongoDB Atlas cluster works fine, or MongoDB running on your own machine)
- Postman, if you want to try the app without writing any code

## How to run it

1. Download the project and open a terminal inside the folder.
2. Install everything the project needs:

   ```
   npm install
   ```

3. Create a file called `.env` in the main folder and put this in it:

   ```
   PORT=8000
   MONGO_URI=your-mongodb-connection-string-here
   ```

4. Start the server:

   ```
   npm start
   ```

   You should see "Connected to MongoDB" and "Server running on port 8000". The server uses nodemon, so it restarts by itself whenever you save a file.

5. Open `http://localhost:8000` in your browser. If you see "Welcome to book store", everything is working.

## What is inside

```
server.js            starts the app
config/db.js         connects to MongoDB
models/Book.js       what a book looks like in the database
routes/              the list of URLs
controllers/         the code that runs for each URL
middleware/          validation (express-validator) and image upload (multer)
uploads/             cover pictures are saved here
postman/             a ready-made Postman collection for testing
```

## What a book looks like

| Field | Needed? | Notes |
|---|---|---|
| title | yes | |
| author | yes | |
| isbn | yes | must be a real ISBN and cannot be used twice |
| price | yes | in rupees (₹), 0 or more |
| genre | no | if you skip it, it becomes "General" |
| description | no | up to 1000 characters |
| stock | no | how many copies you have, starts at 0 |
| coverImage | no | an image file, up to 2 MB |

## The URLs

| What you want to do | Method | URL |
|---|---|---|
| See all books | GET | `/books` |
| See one book | GET | `/books/:id` |
| Add a book | POST | `/addbook` |
| Replace a whole book | PUT | `/books/:id` |
| Change only some fields | PATCH | `/books/:id` |
| Delete a book | DELETE | `/books/:id` |
| Buy a book | POST | `/books/:id/buy` |

`:id` is the `_id` MongoDB gives the book when you add it.

### Adding a book

Send a POST request to `http://localhost:8000/addbook` with this JSON body:

```json
{
  "title": "Clean Code",
  "author": "Robert C. Martin",
  "isbn": "9780132350884",
  "genre": "Programming",
  "price": 35.5,
  "stock": 10
}
```

To add a cover picture, use Body > form-data in Postman instead of JSON. Fill in the same fields and add one more key called `coverImage`, then change its type to File and pick your image. The picture will be available at `http://localhost:8000/uploads/<file name>`.

### Looking at books

You can filter and split the list into pages:

```
/books?genre=Programming
/books?author=Robert C. Martin
/books?minPrice=10&maxPrice=50
/books?page=2&limit=5
```

Genre and author have to be typed exactly as they were saved. By default you get 10 books per page, and the most recent come first.

### PUT or PATCH?

Use PUT when you want to send the whole book again (title, author, isbn and price are required). Use PATCH when you only want to change one or two things, like `{ "price": 29.99 }`.

### Buying a book

Send a POST to `/books/:id/buy` with `{ "quantity": 2 }`. If you leave the quantity out, it buys 1. The stock goes down and you get the total price back in rupees. If there are not enough copies, you get an error and nothing changes.

## When something goes wrong

| Code | What it means |
|---|---|
| 400 | Something you sent is wrong (missing title, bad ISBN, negative price, wrong id, not an image...). The reply tells you which field. |
| 404 | The book or the URL does not exist. |
| 409 | A book with that ISBN is already saved. |

## Testing with Postman

There is a collection with 24 requests ready to go. Import `postman/rnw-books.collection.json` into Postman, or run it from the terminal while the server is running:

```
postman collection run postman/rnw-books.collection.json
```

It adds one test book to your database, tries everything on it, and deletes it at the end.

## Built with

Node.js, Express, MongoDB with Mongoose, express-validator, Multer and Nodemon.

## 🎥 Explanation Video

[▶ Watch the explanation video](https://drive.google.com/file/d/1A5NGrQ_7vmsQZyeHp0kYvvIhv0ZDFvsZ/view?usp=sharing) 
---
