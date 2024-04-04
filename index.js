const express = require("express");
const app = express();
const morgan = require("morgan");
const http = require("http");

app.use(express.static("public"));

app.use(morgan("dev"));

let topMovies = [
  { title: "Shrek", year: "2001" },
  { title: "Shrek 2", year: "2004" },
  { title: "Shrek the Third", year: "2007" },
  { title: "Shrek the Halls", year: "2007" },
  { title: "Shrek Forever After", year: "2010" },
  { title: "Shrek 5", year: "2025" },
  { title: "The Shawshank Redemption", year: "1994" },
  { title: "The Godfather", year: "1972" },
  { title: "The Godfather: Part II", year: "1974" },
  { title: "The Dark Knight", year: "2008" },
];

app.get("/movies", (req, res) => {
  res.json(topMovies);
});

app.get("/", (req, res) => {
  res.send(
    "Welcome to my movie API. Add /movies to the URL to get a list of top 10 movies"
  );
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

app.listen(8080, () => {
  console.log("Server is running on port 8080");
});
