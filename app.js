// setup
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
const router = express.Router();

// making an api using routes

router.get("/songs", function(req, res){
    const songs = [
        {
            title: "Uptown Funk",
            artist: "Bruno Mars",
            popularity: 10,
            releaseDate: new Date("2011, 9, 22"),
            genre: ["Funk", "Boogie"]
        },
        {
            title: "We Found Love",
            artist: "Rhianna",
            popularity: 10,
            releaseDate: new Date("2013, 11, 21"),
            genre: ["Electro House"]
        },
        {
            title: "Happy",
            artist: "Pharrell Williams",
            popularity: 10,
            releaseDate: new Date("2013, 11, 21"),
            genre: ["Soul", "Pop"]
        }
    ];

    res.json(songs);
});

app.use("/api", router);
app.listen(3000);