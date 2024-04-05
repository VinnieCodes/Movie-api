const express = require("express");
const app = express();
const morgan = require("morgan");
const http = require("http");

app.use(express.static("public"));

app.use(morgan("dev"));

let movies = [
  {
    title: "Shrek",
    year: "2001",
    genre: "Animation",
    director: {
      name: "Andrew Adamson",
      birthYear: 1966,
      bio: "Andrew Adamson is a New Zealand filmmaker known for directing the popular animated films 'Shrek' and 'Shrek 2,' bringing humor and heart to the big screen.",
    },
  },
  {
    title: "Shrek 2",
    year: "2004",
    genre: "Animation",
    director: {
      name: "Andrew Adamson",
      birthYear: 1966,
      bio: "Andrew Adamson is a New Zealand filmmaker known for directing the popular animated films 'Shrek' and 'Shrek 2,' bringing humor and heart to the big screen.",
    },
  },
  {
    title: "Shrek the Third",
    year: "2007",
    genre: "Animation",
    director: {
      name: "Chris Miller",
      birthYear: 1966,
      bio: "Chris Miller is a versatile director and screenwriter recognized for his work on animated films like 'Shrek the Third' and 'Puss in Boots,' contributing to their witty storytelling and vibrant characters.",
    },
  },
  {
    title: "Shrek the Halls",
    year: "2007",
    genre: "Animation",
    director: {
      name: "Gary Trousdale",
      birthYear: 1960,
      bio: "Gary Trousdale is an acclaimed animator and director, best known for co-directing Disney's 'Beauty and the Beast,' where his creative vision and attention to detail enchanted audiences worldwide.",
    },
  },
  {
    title: "Shrek Forever After",
    year: "2010",
    genre: "Animation",
    director: {
      name: "Mike Mitchell",
      birthYear: 1970,
      bio: "Mike Mitchell is a skilled filmmaker known for his direction of animated comedies like 'Shrek Forever After' and 'Trolls,' infusing his projects with infectious energy and imaginative worlds.",
    },
  },
  {
    title: "Kubo and the Two Strings",
    year: "2016",
    genre: "Stop-motion",
    director: {
      name: "Travis Knight",
      birthYear: 1973,
      bio: "Travis Knight is a visionary director and producer celebrated for his unique storytelling in animated films like 'Kubo and the Two Strings' and 'Missing Link,' showcasing his dedication to captivating narratives and stunning animation.",
    },
  },
  {
    title: "The Shawshank Redemption",
    year: "1994",
    genre: "Drama",
    director: {
      name: "Frank Darabont",
      birthYear: 1959,
      bio: "Frank Darabont is a seasoned director and screenwriter revered for his work on powerful dramas like 'The Shawshank Redemption' and 'The Green Mile,' crafting emotionally resonant stories that leave a lasting impact on audiences.",
    },
  },
  {
    title: "The Godfather",
    year: "1972",
    genre: "Crime",
    director: {
      name: "Francis Ford Coppola",
      birthYear: 1939,
      bio: "Francis Ford Coppola is an iconic filmmaker recognized for his legendary contributions to cinema, including directing masterpieces like 'The Godfather' trilogy and 'Apocalypse Now,' shaping the landscape of modern filmmaking with his unparalleled creativity and vision.",
    },
  },
  {
    title: "The Godfather: Part II",
    year: "1974",
    genre: "Crime",
    director: {
      name: "Francis Ford Coppola",
      birthYear: 1939,
      bio: "Francis Ford Coppola is an iconic filmmaker recognized for his legendary contributions to cinema, including directing masterpieces like 'The Godfather' trilogy and 'Apocalypse Now,' shaping the landscape of modern filmmaking with his unparalleled creativity and vision.",
    },
  },
  {
    title: "The Dark Knight",
    year: "2008",
    genre: "Action",
    director: {
      name: "Christopher Nolan",
      birthYear: 1970,
      bio: "Christopher Nolan is a visionary director renowned for his groundbreaking films such as 'The Dark Knight' trilogy and 'Inception,' pushing the boundaries of storytelling and visual effects while captivating audiences with his thought-provoking narratives.",
    },
  },
];

// read
app.get("/movies", (req, res) => {
  res.status(200).json(movies);
});

//read
app.get("/movies/:title", (req, res) => {
  const { title } = req.params;
  const movie = movies.find((movie) => movie.title === title);

  if (movie) {
    res.status(200).json(movie);
  } else {
    res.status(400).send("no such movie");
  }
});

//read
app.get("/movies/:genre", (req, res) => {
  const { genre } = req.params;
  const movie = movies.find((movie) => movie.genre === genre);

  if (movie) {
    res.status(200).json(movie);
  } else {
    res.status(400).send("no such movie");
  }
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
