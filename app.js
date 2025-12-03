// setup
const express = require('express');
const Song = require("./models/songs");
var cors = require('cors');

const app = express();
app.use(cors())

app.use(express.json());

const router = express.Router();

// grab all the songs in the database
router.get("/songs", async function (req, res) {
    try {
        const songs = await Song.find();
        res.json(songs);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});


router.post("/songs", async(req, res) => {
    try{
        const song = await new Song(req.body);
        await song.save();
        res.status(201).json(song);
        console.log(song);
    }
    catch(err) {
        res.status(400).send(err);
    }
})

app.use("/api", router);
app.listen(3000);