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

// grab a single song
router.get("/songs/:id", async(req, res) => {
    try{
        const song = await Song.findById(req.params.id);
        res.json(song);
    }
    catch (err){
        res.status(400).send(err);
    }
});


// add a song to the database
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

// update an exsisting song
router.put("/songs/:id", async(req, res) => {
    try{
        const song = req.body;
        await Song.updateOne({_id : req.params.id}, song);
        console.log(song);
        res.sendStatus(204);
    }
    catch(err) {
        res.status(400).send(err);
    }
})

app.use("/api", router);
app.listen(3000);