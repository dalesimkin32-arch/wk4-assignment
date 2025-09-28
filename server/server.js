// wk4 assessment - DB of (20) best (all time) sci-fi novels

// imports
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import pg from "pg";

// instantiate the server
const app = express();

// setup middleware (config stuff)

// so our server can read json
app.use(express.json());
// loads our environment variable
dotenv.config();
// allows our server to talk to other servers
app.use(cors());

// set up database connection
const db = new pg.Pool({
  connectionString: process.env.DB_CONN,
});

// root get msg
app.get("/", (req, res) => {
  res
    .status(200)
    .json(`You're looking at my root route. The rudeness abounds!`);
});

// querying our postgresql database asynchronously.
app.get("/sci_fi_novels", async (req, res) => {
  // fetch all jokes from sql table
  const result = await db.query(`SELECT * FROM sci_fi_novels`);

  res.json(result.rows);
});

// make a POST route to allow people to add a new great Sci Fi Novel
app.post("/sci_fi_novels", async (req, res) => {
  // When the client sends up information is always in the request.body
  const body = req.body;

  const titleFromClient = req.body.title;
  const authorFromClient = req.body.author;
  const isbn13FromClient = req.body.isbn13;
  const summaryFromClient = req.body.summary;
  const reviewFromClient = req.body.review;
  const starRatingFromClient = req.body.starRating;
  const coverImageFromClient = req.body.coverImage;

  // we use $1, $2 as placeholders so we aren't just putting whatever sends us in the string.
  const data = await db.query(
    `INSERT INTO sci_fi_novels (title, author, ISBN13, summary, review, starRating, coverImage) VALUES ($1, $2, $3, $4, $5, $6, $7)`,
    [
      titleFromClient,
      authorFromClient,
      isbn13FromClient,
      summaryFromClient,
      reviewFromClient,
      starRatingFromClient,
      coverImageFromClient,
    ]
  );

  res.json({ status: "Sci Fi Novel inserted into database" });
});

/* example db row for building js code
{
        "id": 4,
        "title": "Foundation",
        "author": "Isaac Asimov",
        "isbn13": "9780553293357",
        "summary": "A mathematician predicts the fall of the Galactic Empire and creates a foundation to preserve knowledge.",
        "review": "Asimov’s sweeping saga of science and strategy.",
        "star_rating": "4.6",
        "cover_image": "https://images-na.ssl-images-amazon.com/images/I/71Zz5vFZJXL.jpg"
},
*/

// listen on port 8080
app.listen(8080, () => {
  console.log("Server started on http://localhost:8080");
});
