const express = require("express");
const app = express();
const morgan = require("morgan");
const http = require("http");
const bodyParser = require("body-parser");
uuid = require("uuid");

app.use(bodyParser.json());

app.use(express.static("public"));

app.use(morgan("dev"));

let users = [
  {
    id: 1,
    name: "Anaiah",
    favoriteMovies: ["Shrek", "Intersteller"],
  },
  {
    id: 2,
    name: "Vinnie",
    favoriteMovies: ["Kubo and the Two Strings"],
  },
];

let movies = [
  {
    Title: "Shrek",
    Description:
      "A green ogre embarks on a quest to rescue a princess and discovers the true meaning of friendship",
    Year: "2001",
    Genre: {
      Name: "Animation",
      Description: "Moving images created from a series of pictures.",
    },
    Director: {
      Name: "Andrew Adamson",
      Birth: 1966,
      Bio: "Andrew Adamson is a New Zealand filmmaker known for directing the popular animated films 'Shrek' and 'Shrek 2,' bringing humor and heart to the big screen.",
    },
  },
  {
    Title: "Shrek 2",
    Description:
      "Shrek and Fiona visit Fiona's parents in the kingdom of Far Far Away, facing new challenges and humorous adventures",
    Year: "2004",
    Genre: {
      Name: "Animation",
      Description: "Moving images created from a series of pictures.",
    },
    Director: {
      Name: "Andrew Adamson",
      Birth: 1966,
      Bio: "Andrew Adamson is a New Zealand filmmaker known for directing the popular animated films 'Shrek' and 'Shrek 2,' bringing humor and heart to the big screen.",
    },
  },
  {
    Title: "Shrek the Third",
    Description:
      "Shrek must find a suitable heir to the throne of Far Far Away while dealing with Prince Charming's villainous ambitions",
    Year: "2007",
    Genre: {
      Name: "Animation",
      Description: "Moving images created from a series of pictures.",
    },
    Director: {
      Name: "Chris Miller",
      Birth: 1966,
      Bio: "Chris Miller is a versatile director and screenwriter recognized for his work on animated films like 'Shrek the Third' and 'Puss in Boots,' contributing to their witty storytelling and vibrant characters.",
    },
  },
  {
    Title: "Shrek the Halls",
    Description:
      "Shrek's attempts to create the perfect Christmas for his family are disrupted by his friends' chaotic festivities",
    Year: "2007",
    Genre: {
      Name: "Animation",
      Description: "Moving images created from a series of pictures.",
    },
    Director: {
      Name: "Gary Trousdale",
      Birth: 1960,
      Bio: "Gary Trousdale is an acclaimed animator and director, best known for co-directing Disney's 'Beauty and the Beast,' where his creative vision and attention to detail enchanted audiences worldwide.",
    },
  },
  {
    Title: "Shrek Forever After",
    Description:
      "Shrek makes a deal with the devious Rumpelstiltskin to restore his life to normal, only to find himself in an alternate reality where he must reclaim Fiona's love",
    Year: "2010",
    Genre: {
      Name: "Animation",
      Description: "Moving images created from a series of pictures.",
    },
    Director: {
      Name: "Mike Mitchell",
      Birth: 1970,
      Bio: "Mike Mitchell is a skilled filmmaker known for his direction of animated comedies like 'Shrek Forever After' and 'Trolls,' infusing his projects with infectious energy and imaginative worlds.",
    },
  },
  {
    Title: "Kubo and the Two Strings",
    Description:
      "A young boy named Kubo sets out on a mystical adventure to uncover the truth about his family and fulfill his destiny",
    Year: "2016",
    Genre: {
      Name: "Stop-motion",
      Description:
        "Objects moved in small increments between photos to create motion.",
    },
    Director: {
      Name: "Travis Knight",
      Birth: 1973,
      Bio: "Travis Knight is a visionary director and producer celebrated for his unique storytelling in animated films like 'Kubo and the Two Strings' and 'Missing Link,' showcasing his dedication to captivating narratives and stunning animation.",
    },
  },
  {
    Title: "The Shawshank Redemption",
    Description:
      "A man wrongfully imprisoned for murder forms a deep bond with a fellow inmate while planning his escape",
    Year: "1994",
    Genre: {
      Name: "Drama",
      Description: "Narrative fiction focusing on conflicts and emotions",
    },
    Director: {
      Name: "Frank Darabont",
      Birth: 1959,
      Bio: "Frank Darabont is a seasoned director and screenwriter revered for his work on powerful dramas like 'The Shawshank Redemption' and 'The Green Mile,' crafting emotionally resonant stories that leave a lasting impact on audiences.",
    },
  },
  {
    Title: "The Godfather",
    Description:
      "The aging patriarch of a powerful crime family transfers control to his reluctant son, leading to a series of violent power struggles",
    Year: "1972",
    Genre: {
      Name: "Crime",
      Description: "Unlawful acts subject to punishment",
    },
    Director: {
      Name: "Francis Ford Coppola",
      Birth: 1939,
      Bio: "Francis Ford Coppola is an iconic filmmaker recognized for his legendary contributions to cinema, including directing masterpieces like 'The Godfather' trilogy and 'Apocalypse Now,' shaping the landscape of modern filmmaking with his unparalleled creativity and vision.",
    },
  },
  {
    Title: "The Godfather: Part II",
    Description:
      "The story of the rise of Vito Corleone juxtaposed with the reign of his son Michael as the new Don of the Corleone crime familyThe story of the rise of Vito Corleone juxtaposed with the reign of his son Michael as the new Don of the Corleone crime family",
    Year: "1974",
    Genre: {
      Name: "Crime",
      Description: "Unlawful acts subject to punishment",
    },
    Director: {
      Name: "Francis Ford Coppola",
      Birth: 1939,
      Bio: "Francis Ford Coppola is an iconic filmmaker recognized for his legendary contributions to cinema, including directing masterpieces like 'The Godfather' trilogy and 'Apocalypse Now,' shaping the landscape of modern filmmaking with his unparalleled creativity and vision.",
    },
  },
  {
    Title: "The Dark Knight",
    Description:
      "Batman faces off against the Joker, a criminal mastermind who seeks to plunge Gotham City into chaos",
    Year: "2008",
    Genre: {
      Name: "Action",
      Description: "Fast-paced genre with intense conflict and physical stunts",
    },
    Director: {
      Name: "Christopher Nolan",
      Birth: 1970,
      Bio: "Christopher Nolan is a visionary director renowned for his groundbreaking films such as 'The Dark Knight' trilogy and 'Inception,' pushing the boundaries of storytelling and visual effects while captivating audiences with his thought-provoking narratives.",
    },
  },
];

//create 1
app.post("/users", (req, res) => {
  const newUser = req.body;

  if (newUser.name) {
    newUser.id == uuid.v4();
    users.push(newUser);
    res.status(201).json(newUser);
  } else {
    res.status(400).send("users need names");
  }
});

//update 2
app.put("/users/:id", (req, res) => {
  const { id } = req.params;
  const updatedUser = req.body;

  let user = users.find((user) => user.id == id);

  if (user) {
    user.name = updatedUser.name;
    res.status(200).json(user);
  } else {
    res.status(400).send("no such user");
  }
});

//create 3
app.post("/users/:id/:movieTitle", (req, res) => {
  const { id, movieTitle } = req.params;

  let user = users.find((user) => user.id == id);

  if (user) {
    user.favoriteMovies.push(movieTitle);
    res.status(200).send(`${movieTitle} has been added to user ${id}'s array`);
  } else {
    res.status(400).send("no such user");
  }
});

//delete 4
app.delete("/users/:id/:movieTitle", (req, res) => {
  const { id, movieTitle } = req.params;

  let user = users.find((user) => user.id == id);

  if (user) {
    let result = user.favoriteMovies.filter((m) => m != movieTitle);
    user.favoriteMovies = result;
    res
      .status(200)
      .send(`${movieTitle} has been removed from user ${id}'s array`);
  } else {
    res.status(400).send("no such user");
  }
});

//delete 5
app.delete("/users/:id", (req, res) => {
  const { id } = req.params;

  let user = users.find((user) => user.id == id);

  if (user) {
    users = users.filter((user) => user.id != id);
    res.status(200).send(`user ${id} has been deleted`);
  } else {
    res.status(400).send("no such user");
  }
});

// read 6
app.get("/movies", (req, res) => {
  res.status(200).json(movies);
});

//read 7
app.get("/movies/:title", (req, res) => {
  const { title } = req.params;
  const movie = movies.find((movie) => movie.Title === title);

  if (movie) {
    res.status(200).json(movie);
  } else {
    res.status(400).send("no such movie");
  }
});

//read 8
app.get("/movies/genre/:genreName", (req, res) => {
  const { genreName } = req.params;
  const genre = movies.find((movie) => movie.Genre.Name === genreName).Genre;

  if (genre) {
    res.status(200).json(genre);
  } else {
    res.status(400).send("no such movie");
  }
});

//read 9
app.get("/movies/directors/:directorName", (req, res) => {
  const { directorName } = req.params;
  const director = movies.find(
    (movie) => movie.Director.Name === directorName
  ).Director;

  if (director) {
    res.status(200).json(director);
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
