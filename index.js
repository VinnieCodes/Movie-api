const mongoose = require("mongoose");
const Models = require("./models.js");

const Movies = Models.Movie;
const Users = Models.User;

// mongoose.connect("mongodb://localhost:27017/test", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

const express = require("express");
const app = express();
const morgan = require("morgan");
const http = require("http");
const bodyParser = require("body-parser");
uuid = require("uuid");
const bcrypt = require("bcrypt");
const { check, validationResult } = require("express-validator");

app.use(bodyParser.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan("dev"));

const cors = require('cors');
let allowedOrigins = [
  "http://localhost:8080",
  "http://testsite.com",
  "http://localhost:1234",
  "https://my-flix20.netlify.app",
  "http://localhost:4200",
  "https://myflix-angular-client5463.netlify.app",
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) { // If a specific origin isn’t found on the list of allowed origins
      let message = 'The CORS policy for this application doesn’t allow access from origin ' + origin;
      return callback(new Error(message), false);
    }
    return callback(null, true);
  }
}));

let auth = require("./auth")(app);

const passport = require("passport");
require("./passport");

// mongoose.connect(
//   "mongodb+srv://vincentathorne2005:Vin33005!@firstcluster.29pvwff.mongodb.net/movieFlix",
//   {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   }
// );

mongoose.connect(process.env.CONNECTION_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

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
    ID: "1",
    Title: "Shrek",
    Description:
      "A green ogre embarks on a quest to rescue a princess and discovers the true meaning of friendship",
    Year: "2001",
    Genre: {
      GenreID: "1",
      Name: "Animation",
      Description: "Moving images created from a series of pictures.",
    },
    Director: {
      DirectorID: "1",
      Name: "Andrew Adamson",
      Birth: 1966,
      Bio: "Andrew Adamson is a New Zealand filmmaker known for directing the popular animated films 'Shrek' and 'Shrek 2,' bringing humor and heart to the big screen.",
    },
    Featured: "yes",
    ImageURL:
      "https://m.media-amazon.com/images/M/MV5BOGZhM2FhNTItODAzNi00YjA0LWEyN2UtNjJlYWQzYzU1MDg5L2ltYWdlL2ltYWdlXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_FMjpg_UX1000_.jpg",
  },
  {
    ID: "2",
    Title: "Shrek 2",
    Description:
      "Shrek and Fiona visit Fiona's parents in the kingdom of Far Far Away, facing new challenges and humorous adventures",
    Year: "2004",
    Genre: {
      GenreID: "1",
      Name: "Animation",
      Description: "Moving images created from a series of pictures.",
    },
    Director: {
      DirectorID: "1",
      Name: "Andrew Adamson",
      Birth: 1966,
      Bio: "Andrew Adamson is a New Zealand filmmaker known for directing the popular animated films 'Shrek' and 'Shrek 2,' bringing humor and heart to the big screen.",
    },
    Featured: "yes",
    ImageURL:
      "https://m.media-amazon.com/images/M/MV5BMDJhMGRjN2QtNDUxYy00NGM3LThjNGQtMmZiZTRhNjM4YzUxL2ltYWdlL2ltYWdlXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_.jpg",
  },
  {
    ID: "3",
    Title: "Shrek the Third",
    Description:
      "Shrek must find a suitable heir to the throne of Far Far Away while dealing with Prince Charming's villainous ambitions",
    Year: "2007",
    Genre: {
      GenreID: "1",
      Name: "Animation",
      Description: "Moving images created from a series of pictures.",
    },
    Director: {
      DirectorID: "2",
      Name: "Chris Miller",
      Birth: 1966,
      Bio: "Chris Miller is a versatile director and screenwriter recognized for his work on animated films like 'Shrek the Third' and 'Puss in Boots,' contributing to their witty storytelling and vibrant characters.",
    },
    Featured: "yes",
    ImageURL:
      "https://m.media-amazon.com/images/M/MV5BOTgyMjc3ODk2MV5BMl5BanBnXkFtZTcwMjY0MjEzMw@@._V1_.jpg",
  },
  {
    ID: "4",
    Title: "Shrek the Halls",
    Description:
      "Shrek's attempts to create the perfect Christmas for his family are disrupted by his friends' chaotic festivities",
    Year: "2007",
    Genre: {
      GenreID: "1",
      Name: "Animation",
      Description: "Moving images created from a series of pictures.",
    },
    Director: {
      DirectorID: "3",
      Name: "Gary Trousdale",
      Birth: 1960,
      Bio: "Gary Trousdale is an acclaimed animator and director, best known for co-directing Disney's 'Beauty and the Beast,' where his creative vision and attention to detail enchanted audiences worldwide.",
    },
    Featured: "yes",
    ImageURL:
      "https://m.media-amazon.com/images/M/MV5BZDE0NGZkOGMtNGY4My00OTM4LTliM2MtM2Y5OTVjOTFmNTA5XkEyXkFqcGdeQXVyNDgyODgxNjE@._V1_.jpg",
  },
  {
    ID: "5",
    Title: "Shrek Forever After",
    Description:
      "Shrek makes a deal with the devious Rumpelstiltskin to restore his life to normal, only to find himself in an alternate reality where he must reclaim Fiona's love",
    Year: "2010",
    Genre: {
      GenreID: "1",
      Name: "Animation",
      Description: "Moving images created from a series of pictures.",
    },
    Director: {
      DirectorID: "4",
      Name: "Mike Mitchell",
      Birth: 1970,
      Bio: "Mike Mitchell is a skilled filmmaker known for his direction of animated comedies like 'Shrek Forever After' and 'Trolls,' infusing his projects with infectious energy and imaginative worlds.",
    },
    Featured: "yes",
    ImageURL:
      "https://m.media-amazon.com/images/I/81tYGi0ar7L._AC_UF894,1000_QL80_.jpg",
  },
  {
    ID: "6",
    Title: "Kubo and the Two Strings",
    Description:
      "A young boy named Kubo sets out on a mystical adventure to uncover the truth about his family and fulfill his destiny",
    Year: "2016",
    Genre: {
      GenreID: "2",
      Name: "Stop-motion",
      Description:
        "Objects moved in small increments between photos to create motion.",
    },
    Director: {
      DirectorID: "5",
      Name: "Travis Knight",
      Birth: 1973,
      Bio: "Travis Knight is a visionary director and producer celebrated for his unique storytelling in animated films like 'Kubo and the Two Strings' and 'Missing Link,' showcasing his dedication to captivating narratives and stunning animation.",
    },
    Featured: "no",
    ImageURL:
      "https://upload.wikimedia.org/wikipedia/en/c/c4/Kubo_and_the_Two_Strings_poster.png",
  },
  {
    ID: "7",
    Title: "The Shawshank Redemption",
    Description:
      "A man wrongfully imprisoned for murder forms a deep bond with a fellow inmate while planning his escape",
    Year: "1994",
    Genre: {
      GenreID: "3",
      Name: "Drama",
      Description: "Narrative fiction focusing on conflicts and emotions",
    },
    Director: {
      DirectorID: "6",
      Name: "Frank Darabont",
      Birth: 1959,
      Bio: "Frank Darabont is a seasoned director and screenwriter revered for his work on powerful dramas like 'The Shawshank Redemption' and 'The Green Mile,' crafting emotionally resonant stories that leave a lasting impact on audiences.",
    },
    Featured: "no",
    ImageURL:
      "https://m.media-amazon.com/images/M/MV5BNDE3ODcxYzMtY2YzZC00NmNlLWJiNDMtZDViZWM2MzIxZDYwXkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_.jpg",
  },
  {
    ID: "8",
    Title: "The Godfather",
    Description:
      "The aging patriarch of a powerful crime family transfers control to his reluctant son, leading to a series of violent power struggles",
    Year: "1972",
    Genre: {
      GenreID: "4",
      Name: "Crime",
      Description: "Unlawful acts subject to punishment",
    },
    Director: {
      DirectorID: "7",
      Name: "Francis Ford Coppola",
      Birth: 1939,
      Bio: "Francis Ford Coppola is an iconic filmmaker recognized for his legendary contributions to cinema, including directing masterpieces like 'The Godfather' trilogy and 'Apocalypse Now,' shaping the landscape of modern filmmaking with his unparalleled creativity and vision.",
    },
    Featured: "no",
    ImageURL:
      "https://m.media-amazon.com/images/M/MV5BM2MyNjYxNmUtYTAwNi00MTYxLWJmNWYtYzZlODY3ZTk3OTFlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_FMjpg_UX1000_.jpg",
  },
  {
    ID: "9",
    Title: "The Godfather: Part II",
    Description:
      "The story of the rise of Vito Corleone juxtaposed with the reign of his son Michael as the new Don of the Corleone crime familyThe story of the rise of Vito Corleone juxtaposed with the reign of his son Michael as the new Don of the Corleone crime family",
    Year: "1974",
    Genre: {
      GenreID: "4",
      Name: "Crime",
      Description: "Unlawful acts subject to punishment",
    },
    Director: {
      DirectorID: "7",
      Name: "Francis Ford Coppola",
      Birth: 1939,
      Bio: "Francis Ford Coppola is an iconic filmmaker recognized for his legendary contributions to cinema, including directing masterpieces like 'The Godfather' trilogy and 'Apocalypse Now,' shaping the landscape of modern filmmaking with his unparalleled creativity and vision.",
    },
    Featured: "no",
    ImageURL:
      "https://m.media-amazon.com/images/M/MV5BMWMwMGQzZTItY2JlNC00OWZiLWIyMDctNDk2ZDQ2YjRjMWQ0XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg",
  },
  {
    ID: "10",
    Title: "The Dark Knight",
    Description:
      "Batman faces off against the Joker, a criminal mastermind who seeks to plunge Gotham City into chaos",
    Year: "2008",
    Genre: {
      GenreID: "5",
      Name: "Action",
      Description: "Fast-paced genre with intense conflict and physical stunts",
    },
    Director: {
      DirectorID: "8",
      Name: "Christopher Nolan",
      Birth: 1970,
      Bio: "Christopher Nolan is a visionary director renowned for his groundbreaking films such as 'The Dark Knight' trilogy and 'Inception,' pushing the boundaries of storytelling and visual effects while captivating audiences with his thought-provoking narratives.",
    },
    Featured: "no",
    ImageURL:
      "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_.jpg",
  },
];

//create 1
// app.post("/users", (req, res) => {
//   const newUser = req.body;

//   if (newUser.name) {
//     newUser.id == uuid.v4();
//     users.push(newUser);
//     res.status(201).json(newUser);
//   } else {
//     res.status(400).send("users need names");
//   }
// });

//Add a user
/* We’ll expect JSON in this format
{
  ID: Integer,
  Username: String,
  Password: String,
  Email: String,
  Birthday: Date
} need to change variables*/
app.post(
  "/users",
  // Validation logic here for request
  //you can either use a chain of methods like .not().isEmpty()
  //which means "opposite of isEmpty" in plain english "is not empty"
  //or use .isLength({min: 5}) which means
  //minimum value of 5 characters are only allowed
  [
    check("Username", "Username is required").isLength({ min: 5 }),
    check(
      "Username",
      "Username contains non alphanumeric characters - not allowed."
    ).isAlphanumeric(),
    check("Password", "Password is required").not().isEmpty(),
    check("Email", "Email does not appear to be valid").isEmail(),
  ],
  async (req, res) => {
    // check the validation object for errors
    let errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    let hashedPassword = Users.hashPassword(req.body.Password);
    await Users.findOne({ Username: req.body.Username }) // Search to see if a user with the requested username already exists
      .then((user) => {
        if (user) {
          //If the user is found, send a response that it already exists
          return res.status(400).send(req.body.Username + " already exists");
        } else {
          Users.create({
            Username: req.body.Username,
            Password: hashedPassword,
            Email: req.body.Email,
            Birthday: req.body.Birthday,
          })
            .then((user) => {
              res.status(201).json(user);
            })
            .catch((error) => {
              console.error(error);
              res.status(500).send("Error: " + error);
            });
        }
      })
      .catch((error) => {
        console.error(error);
        res.status(500).send("Error: " + error);
      });
  }
);

// Get all users
app.get("/users", async (req, res) => {
  await Users.find()
    .then((users) => {
      res.status(201).json(users);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

// Get a user by username
app.get("/users/:Username", async (req, res) => {
  await Users.findOne({ Username: req.params.Username })
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

// Update a user's info, by username
/* We’ll expect JSON in this format
{
  Username: String,
  (required)
  Password: String,
  (required)
  Email: String,
  (required)
  Birthday: Date
}*/
app.put("/users/:Username", async (req, res) => {
  await Users.findOneAndUpdate(
    { Username: req.params.Username },
    {
      $set: {
        Username: req.body.Username,
        Password: req.body.Password,
        Email: req.body.Email,
        Birthday: req.body.Birthday,
      },
    },
    { new: true }
  ) // This line makes sure that the updated document is returned
    .then((updatedUser) => {
      res.json(updatedUser);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

// Add a movie to a user's list of favorites
app.post("/users/:Username/movies/:MovieID", async (req, res) => {
  await Users.findOneAndUpdate(
    { Username: req.params.Username },
    {
      $push: { FavoriteMovies: req.params.MovieID },
    },
    { new: true }
  ) // This line makes sure that the updated document is returned
    .then((updatedUser) => {
      res.json(updatedUser);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

// deletes a favorite movie from user mongo
app.delete("/users/:Username/movies/:MovieID", async (req, res) => {
  await Users.findOneAndUpdate(
    { Username: req.params.Username },
    {
      $pull: { FavoriteMovies: req.params.MovieID },
    },
    { new: true }
  ) // This line makes sure that the updated document is returned
    .then((updatedUser) => {
      res.json(updatedUser);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

// Delete a user by username
app.delete("/users/:Username", async (req, res) => {
  await Users.findOneAndDelete({ Username: req.params.Username })
    .then((user) => {
      if (!user) {
        res.status(400).send(req.params.Username + " was not found");
      } else {
        res.status(200).send(req.params.Username + " was deleted.");
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

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

// read movies with authentication
app.get(
  "/movies",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    await Movies.find()
      .then((movies) => {
        res.status(201).json(movies);
      })
      .catch((error) => {
        console.error(error);
        res.status(500).send("Error: " + error);
      });
  }
);

app.get("/movies/:title", (req, res) => {
  const { title } = req.params;
  const movie = movies.find((movie) => movie.Title === title);

  if (movie) {
    res.status(200).json(movie);
  } else {
    res.status(400).send("no such movie");
  }
});

app.get("/movies/genre/:genreName", (req, res) => {
  const { genreName } = req.params;
  const genre = movies.find((movie) => movie.Genre.Name === genreName).Genre;

  if (genre) {
    res.status(200).json(genre);
  } else {
    res.status(400).send("no such movie");
  }
});

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

const port = process.env.PORT || 8080;
app.listen(port, "0.0.0.0", () => {
  console.log("Listening on Port " + port);
});

