// setup
const express = require('express');
const Song = require("./models/songs");
var cors = require('cors');
// const bodyParser = require("body-parser");
const jwt = require("jwt-simple");
const User = require("./models/users");

const app = express();
app.use(cors())

app.use(express.json());

const router = express.Router();
const secret = "supersecret";

// creating a new user
router.post("/user", async(req, res) => {
    if(!req.body.username || !req.body.password) {
        res.status(400).json({error: "Missing username or password"});
    }

    const newUser = await new User({
        username: req.body.username,
        password: req.body.password,
        status: req.body.status
    })
    
    try{
        await newUser.save();
        res.sendStatus(201);
    }
    catch (err){
        res.status(400).send(err);
    }
})

// authenticate or login
router.post("/auth", async (req, res) => {
    if (!req.body.username || !req.body.password) {
        return res.status(400).json({ error: "Missing username or password" });
    }

    let user = await User.findOne({ username: req.body.username });

    if (!user) {
        return res.status(401).json({ error: "Bad Username" });
    }

    if (user.password !== req.body.password) {
        return res.status(401).json({ error: "Bad Password" });
    }

    // Create real JWT
    const token = jwt.encode({ username: user.username }, secret);

    res.json({
        username2: user.username,
        token: token,
        auth: 1
    });
});


// check status of user with a valid token
router.get("/status", async (req, res) => {

    const token = req.headers["x-auth"];

    if (!token) {
        return res.status(401).json({ error: "Missing X-Auth" });
    }

    try {
        const decoded = jwt.decode(token, secret);  // IMPORTANT

        const users = await User.find({}, "username status");

        res.json({
            loggedInUser: decoded.username,
            users
        });

    } catch (err) {
        res.status(401).json({ error: "Invalid jwt" });
    }
});


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

router.delete("/songs/:id", async(req, res) => {
    try{
        await Song.deleteOne({_id: req.params.id});
        res.sendStatus(204);
    }
    catch(err) {
        res.status(400).send(err);
    }
})

app.use("/api", router);

var port = process.env.PORT || 3000

app.listen(3000);